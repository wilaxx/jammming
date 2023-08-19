const clientId = '58e94fb2fa6e4c598384c4b0ccb0d000';
const redirectUri = 'https://localhost:3000';
let accessToken = "";

const Spotify = {

  

getAuthCode() {
        function generateRandomString(length) {
            let text = '';
            let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          
            for (let i = 0; i < length; i++) {
              text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
          };
        function generateCodeChallenge(codeVerifier) {
            function base64encode(string) {
              return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
                .replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=+$/, '');
            }
          
            const encoder = new TextEncoder();
            const data = encoder.encode(codeVerifier);
            const digest = window.crypto.subtle.digest('SHA-256', data);
          
            return base64encode(digest);
          };
        function authorize() {
            // Generate and store a code verifier
            const codeVerifier = generateRandomString(128);
            localStorage.setItem('code_verifier', codeVerifier);
            console.log("le codeVerifier est : " + codeVerifier);
            // Generate the code challenge
            const codeChallenge = generateCodeChallenge(codeVerifier);
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
          authorize();
},      
        


getAccessToken() {
  if (accessToken) {
    return accessToken;
  }
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeFromUrl = urlParams.get('code');
    if (codeFromUrl) {
      console.log("le codefromurl est : " + codeFromUrl)
      console.log("le codeVErifier est : " + localStorage.getItem('code_verifier'))

      let codeVerifier2 = localStorage.getItem('code_verifier');
      console.log("le codeVerifier2 est : " + codeVerifier2)

      let body = new URLSearchParams({
        grant_type: 'authorization_code',
        code: codeFromUrl,
        redirect_uri: redirectUri,
        client_id: clientId,
        code_verifier: codeVerifier2
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
            let accessToken = localStorage.getItem('access_token')
            console.log("le PUTAIN de token est : " + accessToken)
          })
          .catch(error => {
            console.error('Error:', error);
          });
      return accessToken;
    }
    else {
        this.getAuthCode();
    }

},
search(){
  const accessToken = Spotify.getAccessToken();
      
},

// async handleCodeExchange (code){
//   // Perform the steps to exchange the code for an access token
//   // Return the access token
//   const accessToken = ;
//   return accessToken;
// };



};



export {Spotify};
  

/* 


try {
            await authorize();
            } catch (error) {
                    console.log('Error:', error);
                 }






*/