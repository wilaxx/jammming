const clientId = '58e94fb2fa6e4c598384c4b0ccb0d000';
const redirectUri = 'https://localhost:3000';


const Spotify = {
  _userId: '',
  _userName: '',

  
  get userName () {
    return this._userName;
  },
  set userName (newName) {
    this._userName = newName;
  },
  get userId () {
    return this._userId;
  },
  set userId (newId) {
    this._userId = newId;
  },
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
    let codeVerifier = this.generateRandomString(128);
    localStorage.setItem('code_verifier', codeVerifier);
    let codeChallenge = await this.generateCodeChallenge(codeVerifier);
    // Construct the authorization URL
    let state = this.generateRandomString(16);
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
		 
		if((access_Token) && (now - expirationDateAccessToken < 0)) {
			return access_Token;
		}
		else {
      let refresh_Token = localStorage.getItem('refresh_token');
	
    if (refresh_Token){

      try {
      access_Token = await this.refreshToken(refresh_Token);
      localStorage.setItem('access_token', access_Token);
      return access_Token;
      } catch (error) {
        console.error("problem trying to refresh access token", error)
      }
      
    }
  
	}
	},
  async handleAuthorizationCode(code) {
    try {
      const codeVerifier = localStorage.getItem('code_verifier');
  
      let body = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
        client_id: clientId,
        code_verifier: codeVerifier
      });

      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body,
      });
  
      if (!response.ok) {
        console.error('Error exchanging the code for a token:', response.status);
        throw new Error('Token exchange error');
      }
  
      const data = await response.json();
      const accessToken = data.access_token;
      const expiresIn = data.expires_in;
      const refreshToken = data.refresh_token;
  
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('expiration_date', Date.now() + expiresIn * 1000);
      localStorage.setItem('refresh_token', refreshToken);
    } catch (error) {
      console.error('An error occurred during code exchange:', error);
      throw error;
    }
  },
  async urlCodeToToken() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeFromUrl = urlParams.get('code');
    
    if (codeFromUrl) {
      try {
        await this.handleAuthorizationCode(codeFromUrl);
        window.location.href = '/';
      } catch (error) {
        console.error('error exchange with code from url : ', error);
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
        throw new Error("An error occurred during token refresh : " + response.message);

      }
        const data = await response.json(); 
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        let expiration_date = Date.now() + data.expires_in * 1000;
        localStorage.setItem('expiration_date', expiration_date);
        return data.access_token;
      
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
	async search(word) {
		let accessToken = await this.getAccessToken();

    try {
    const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${word}`, {
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  });
  if (!response.ok) {
    throw new Error("An error occurred during the search Spotify.js : " + response.status);
  }


  const data = await response.json();
  if(data.tracks.items.length === 0){
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
    console.error(error, error.status + " " + error.message);
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
      alert("Tracks added to playlist successfully.");
      return 'Success';
    } else {
      throw new Error('Error when trying to add tracks to playlist : ' + addTracksResponse.message);
    }
  }
  else {
    throw new Error('Error getting playlist ID');
  }

  },
  async getCurrentUserProfile() {
    let accessToken = await this.getAccessToken();

    try {
      const response = await fetch(`https://api.spotify.com/v1/me`, {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    });
    if (!response.ok) {
      throw new Error("An error occurred during profile retrieval");
    }
  
    const data = await response.json();
    
    this._userName = data.display_name;
    this._userId = data.id;
    return;
    } catch (error) {
      console.error(error, error.status + " " + error.message);
          throw error; // Rethrow the error
      }
  },
  async getCurrentUserPlaylistsInfos() {
    let accessToken = await this.getAccessToken();

    try {
      const response = await fetch(`https://api.spotify.com/v1/me/playlists`, {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    });
    if (!response.ok) {
      throw new Error("An error occurred during playlists retrieval with code : " + response.code + " and message : " + response.message);
    }
  
    const data = await response.json();
    let arrayPlaylistsInfos = data.items.map(x => ({id: x.id, name: x.name}));

    return arrayPlaylistsInfos;
    } catch (error) {
      console.error(error, error.status + " " + error.message);
      }
  },
  async getPlaylists() {
    let accessToken = await this.getAccessToken();
    let allPlaylistsItems = await this.getCurrentUserPlaylistsInfos();

    try {
      
      for (let element of allPlaylistsItems) {
        let playlistId = element.id;
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
          headers: {
            Authorization: 'Bearer ' + accessToken
          }
        });
  
        if (!response.ok) {
          throw new Error(`An error occurred while fetching playlist ${playlistId} with code: ${response.status}`);
        }
  

        const data = await response.json();
        let playlistItems = await data.items.map(item => ({
          id: item.track.id,
          name: item.track.name,
          artist: item.track.artists[0].name,
          album: item.track.album.name,
          uri: item.track.uri
        }));
  
        element.tracks = playlistItems;
        console.log("element.tracks vaut : " + element.tracks)
        console.log("element.tracks.name vaut : " + element.tracks[0].name)

      }

      return allPlaylistsItems;
    } catch (error) {
      console.error(error);
      return null;
    }
  }




	
};


export {Spotify};


