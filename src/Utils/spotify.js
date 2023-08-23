const clientId = '58e94fb2fa6e4c598384c4b0ccb0d000';
const redirectUri = 'https://localhost:3000';
let access_Token;



const Spotify = {

  generateRandomString(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  },

  async generateCodeChallenge(codeVerifier) {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const hashBuffer =  await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashBase64 = btoa(String.fromCharCode(...hashArray))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

    return hashBase64;
  },

  async authorize() {
    const codeVerifier = this.generateRandomString(128);
    localStorage.setItem('code_verifier', codeVerifier);
    const codeChallenge =  await this.generateCodeChallenge(codeVerifier);
    // Construct the authorization URL
    let state = this.generateRandomString(16);
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
  },

	async getAccessToken() {
		let access_Token = localStorage.getItem('access_token');
		const expirationDateAccessToken = localStorage.getItem('expiration_date');
    const now = Date.now();
    console.log("expirationDateAccessToken vaut : " + expirationDateAccessToken);
    console.log("now vaut : " + now);
		 
		if((access_Token) && (now - expirationDateAccessToken < 0)) {
      console.log("Il existe deja un token qui n'a pas expire : " + access_Token);
			return access_Token;
		}
		else {
      const refresh_Token = localStorage.getItem('refresh_token');
	
    if (refresh_Token){
      access_Token = await this.refreshToken(refresh_Token);
      localStorage.setItem('access_token', access_Token);
      return access_Token;
    }
		else {
			const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const codeFromUrl = urlParams.get('code');
      if (codeFromUrl) {
        let codeverifier = localStorage.getItem('code_verifier');
        console.log("URL code after redirect is : " + codeFromUrl)
        console.log("Code Verifier is: " + codeverifier)

        let body = new URLSearchParams({
          grant_type: 'authorization_code',
          code: codeFromUrl,
          redirect_uri: redirectUri,
          client_id: clientId,
          code_verifier: codeverifier
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
            console.log("There was a problem exchanging the code for a token: " + response.status);
            return;
          }
        
          const data = await response.json();
          let access_Token = data.access_token;
          let expires_in = data.expires_in
          let refresh_token = data.refresh_token
          localStorage.setItem('access_token', access_Token);
          localStorage.setItem('expires_in', expires_in);
          localStorage.setItem('refresh_token', refresh_token);
          let now = Date.now();
          let expirationDate = now + expires_in * 1000;
          console.log("la date d'expiration est" + expirationDate);
          localStorage.setItem('expiration_date', expirationDate);
        
          return access_Token;
        } catch (error) {
          console.log("An error occurred while exchanging the code for a token: ", error);
          } 
          
        }
      else {
           await this.authorize();
      }
		}
	}
	},

	async refreshToken(refToken) {
    let body = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refToken,
      client_id: clientId,
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
        console.log("probleme de refresh : " + response.status);
      } else {
        const data = await response.json(); // Await the JSON parsing here
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        let expiration_date = Date.now() + data.expires_in * 1000;
        localStorage.setItem('expiration_date', expiration_date);
        return data.access_token;
      }
    } catch (error) {
      console.log("An error occurred while refreshing the token: ", error);
    }
  },

	async search() {
		let accessToken = await Spotify.getAccessToken();
		console.log("Spotify.search() a bien recup le token " + accessToken);
    return accessToken;
	}
};


export {Spotify};