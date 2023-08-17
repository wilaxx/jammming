const clientId = '58e94fb2fa6e4c598384c4b0ccb0d000';
const redirectUri = 'https://localhost:3000';
let accessToken = "";

const Spotify = {

async getAccessToken() {

    if (accessToken) {
        return accessToken;
    }
    else {
        function generateRandomString(length) {
            let text = '';
            let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          
            for (let i = 0; i < length; i++) {
              text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
          };
          async function generateCodeChallenge(codeVerifier) {
            function base64encode(string) {
              return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
                .replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=+$/, '');
            }
          
            const encoder = new TextEncoder();
            const data = encoder.encode(codeVerifier);
            const digest = await window.crypto.subtle.digest('SHA-256', data);
          
            return base64encode(digest);
          };
        try {
            let codeVerifier = generateRandomString(128);
            let codeChallenge = await generateCodeChallenge(codeVerifier);
            let state = generateRandomString(16);
            let scope = 'user-read-private user-read-email';

            localStorage.setItem('code_verifier', codeVerifier);

            // We are going to construct the url with these params
            let args = new URLSearchParams({
                response_type: 'code',
                client_id: clientId,
                scope: scope,
                redirect_uri: redirectUri,
                state: state,
                code_challenge_method: 'S256',
                code_challenge: codeChallenge
            });

            // To create the URL
            const authorizationUrl = 'https://accounts.spotify.com/authorize?' + args;
            console.log("Authorization URL:", authorizationUrl);

            // We can now take the user to the endpoint /authorize
            window.location = 'https://accounts.spotify.com/authorize?' + args;


            const urlParams = new URLSearchParams(window.location.search);
            let code = urlParams.get('code');
            console.log("le code dans l'url est : " + code)
            
            let newCodeVerifier = localStorage.getItem('code_verifier');

            let body = new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirectUri,
            client_id: clientId,
            code_verifier: newCodeVerifier
            });

            const response = fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: body
                })
                .then(response => {
                    if (!response.ok) {
                    throw new Error('HTTP status ' + response.status);
                    }
                    return response.json();
                })
                .then(data => {
                    localStorage.setItem('access_token', data.access_token);
                })
                .catch(error => {
                    console.error('Error:', error);
                });


            } catch (error) {
                    console.log('Error:', error);
                 }
    }
},
async search(term){
    let accessToken = await this.getAccessToken();
    console.log("le accesstoken est : " + accessToken)
}

};






export {Spotify};
  