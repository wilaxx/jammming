const clientId = '58e94fb2fa6e4c598384c4b0ccb0d000';
const redirectUri = 'https://localhost:3000';

const Spotify = {

async getAccessToken() {
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
      }

    if (accessToken) {
        return accessToken;
    }
    else {
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


            } catch (error) {
                    console.log('Error:', error);
                 }
    }
    },
},
search(term){

},

save Playlist


};

export {Spotify};
  