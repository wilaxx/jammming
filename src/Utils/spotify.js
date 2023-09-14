const clientId = '58e94fb2fa6e4c598384c4b0ccb0d000';
const redirectUri = 'https://localhost:3000';


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
    console.log("lancement de authorize() ...");
    const codeVerifier = this.generateRandomString(128);
    localStorage.setItem('code_verifier', codeVerifier);
    const codeChallenge =  await this.generateCodeChallenge(codeVerifier);
    // Construct the authorization URL
    let state = this.generateRandomString(16);
    console.log("le state est : " + state);
    let scope = 'user-read-private user-read-email playlist-modify-public';
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
      console.log("le access_Token grace au refresh() vaut : " + access_Token);
      return access_Token;
    }
		else {
			const queryString = window.location.search;
      console.log("vrai QueryString vaut : " + queryString)
      const urlParams = new URLSearchParams(queryString);
      const codeFromUrl = urlParams.get('code');
      
      if (codeFromUrl) {
        console.log("just apres if(codeFromUrl), codeFromUrl vaut : " + codeFromUrl);
        let codeverifier = localStorage.getItem('code_verifier');
        console.log("URL code after redirect is : " + codeFromUrl);
        console.log("Code Verifier is: " + codeverifier);

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
            throw new Error("There was an error during token exchange");
          }
          console.log("reponse is ok, on cree le reste")
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
          console.log("access_Token vaut : " + access_Token);
          return access_Token;
        } catch (error) {
          console.log("An error occurred while exchanging the code for a token: ", error);
          throw error;
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
        throw new Error("An error occurred during token refresh");

      } else {
        const data = await response.json(); 
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        let expiration_date = Date.now() + data.expires_in * 1000;
        localStorage.setItem('expiration_date', expiration_date);
        return data.access_token;
      }
    } catch (error) {
      console.log("An error occurred while refreshing the token: ", error);
      throw error;
    }
  },

	async search(word) {
		let accessToken = await this.getAccessToken();
		console.log("Spotify.search() a bien recup le token " + accessToken);

    try {
    const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${word}`, {
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  });
  if (!response.ok) {
    console.log("An error occurred during the search: " + response.status);
    throw new Error("An error occurred during the search");
  }

  const data = await response.json();
  if(!data.tracks){
    return [];
  }
  const results =  await data.tracks.items.map(track => ({
    id: track.id,
    name: track.name,
    artist: track.artists[0].name,
    album: track.album.name,
    uri: track.uri

  }));

  return results;
  }
   catch (error) {
    console.log("An error occurred during the search: ", error);
        throw error; // Rethrow the error
    }
  },

  async savePlaylist(name, tracks) {
    let accessToken = await this.getAccessToken();


    const response = await fetch(`https://api.spotify.com/v1/me`, {
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  });
    const data = await response.json();
    const user_id = data.id;

    const response2 = await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + accessToken
      },
      body: JSON.stringify({name: name})

  });

  const data2 = await response2.json();
  const playlistId = data2.id;
  console.log("l'id de la playlist est : " + playlistId);

  if (playlistId) {
    const urisArray = tracks.map(track => track.uri);
    
    const addTracksResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ uris: urisArray })
    });

    if (addTracksResponse.ok) {
      console.log("Tracks added to playlist successfully.");
    } else {
      console.error("An error occurred while adding tracks to the playlist.");
    }
  }
  else {
    console.log("Erreur lors de la recuperation de la playlist");
  }

  }

   
	
};


export {Spotify};