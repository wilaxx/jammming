const clientId = '58e94fb2fa6e4c598384c4b0ccb0d000';
const redirectUri = 'https://localhost:3000';
let accessToken;

const Spotify = {
  async getAuthCode() {
          function generateRandomString(length) {
              let text = '';
              let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            
              for (let i = 0; i < length; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
              }
              return text;
            };
            async function generateCodeChallenge(codeVerifier) {
              const encoder = new TextEncoder();
              const data = encoder.encode(codeVerifier);
              const hashBuffer = await crypto.subtle.digest('SHA-256', data);
              const hashArray = Array.from(new Uint8Array(hashBuffer));
              const hashBase64 = btoa(String.fromCharCode(...hashArray))
                  .replace(/\+/g, '-')
                  .replace(/\//g, '_')
                  .replace(/=+$/, '');
          
              return hashBase64;
          };
          async function authorize() {
              // Generate and store a code verifier
              const codeVerifier = generateRandomString(128);
              localStorage.setItem('code_verifier', codeVerifier);
              console.log("le codeVerifier est : " + codeVerifier);
              // Generate the code challenge
              const codeChallenge = await generateCodeChallenge(codeVerifier);
              // Construct the authorization URL
              let state = generateRandomString(16);
              console.log("le state est : " + state);
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

              window.location.href = authorizationUrl;   
            };
            await authorize();
  },      
  async getAccessToken() {
    if (accessToken) {
      console.log("vous avez deja un access token qui est le suivant : " + accessToken);
      return accessToken;
    }
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const codeFromUrl = urlParams.get('code');
      if (codeFromUrl) {
        console.log("le codefromurl est : " + codeFromUrl)
        console.log("le codeVerifier est : " + localStorage.getItem('code_verifier'))

        let codeVerifier = localStorage.getItem('code_verifier');
        console.log("le codeVerifier2 est : " + codeVerifier)

        let body = new URLSearchParams({
          grant_type: 'authorization_code',
          code: codeFromUrl,
          redirect_uri: redirectUri,
          client_id: clientId,
          code_verifier: codeVerifier
        });

        try {
          const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body
          });
        
          if (!response.ok) {
            throw new Error('HTTP status ' + response.status);
          }
        
          const data = await response.json();
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('expires_in', data.expires_in);
          localStorage.setItem('refresh_token', data.refresh_token);
          let accessToken = localStorage.getItem('access_token');
          let expiresIn = localStorage.getItem('expires_in');
          console.log("letoken est : " + accessToken);
          window.setTimeout(() => accessToken = '', expiresIn * 1000);
          
          return accessToken;
        } catch (error) {
          console.error('Error:', error);
        }
      }
      else {
          await this.getAuthCode();
      }

  },
  async search(){
    const accessToken = await Spotify.getAccessToken();

  },
};



export {Spotify};