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
        async function authorize() {
            // Generate and store a code verifier
            const codeVerifier = generateRandomString(128);
            localStorage.setItem('code_verifier', codeVerifier);
            // Generate the code challenge
            const codeChallenge = await generateCodeChallenge(codeVerifier);
            // Construct the authorization URL
            let state = generateRandomString(16);
            let scope = 'user-read-private user-read-email';
            const args = new URLSearchParams({
              response_type: 'code',
              client_id: clientId,
              scope: scope,
              redirect_uri: redirectUri,
              state: state, 
              code_challenge_method: 'S256',
              code_challenge: codeChallenge,
            });
            
            const authorizationUrl = 'https://accounts.spotify.com/authorize?' + args;
            console.log("Authorization URL:", authorizationUrl);
            window.location = authorizationUrl;    
          };
          try {
            const hello = await authorize();
            console.log(hello);
            } catch (error) {
                    console.log('Error:', error);
                 }
        }


},
async search(){
    await this.getAccessToken();
    console.log("le accesstoken est : " + accessToken)
},



};



export {Spotify};
  