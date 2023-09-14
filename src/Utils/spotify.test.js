// spotify.test.js

import { Spotify } from './spotify';



describe('Spotify', () => {

  const clientId = '58e94fb2fa6e4c598384c4b0ccb0d000';
  const redirectUri = 'https://localhost:3000';

  
  describe('generateRandomString', () => {
    // ------- test1 generate random string ------------
    it('test1 should generate a random string of specified length', () => {
      console.log("++++++++++++++++++++ LANCEMENT DU TEST : 1 ++++++++++++++++++++");
      const length = 10;
      const randomString = Spotify.generateRandomString(length);
      expect(randomString.length).toBe(length);
    });
  });

  describe('generateCodeChallenge', () => {

    global.TextEncoder = class {
      encode(str) {
        return new Uint8Array([...str].map(char => char.charCodeAt(0)));
      }
    };

    const isBase64Encoded = (str) => {
      return /^[A-Za-z0-9+/=]+$/.test(str);
    };
    // ------- test2 generate code challenge ------------
    it('test2 should generate a challengeCode', async () => {
      console.log("++++++++++++++++++++ LANCEMENT DU TEST : 2 ++++++++++++++++++++");
      const mockDigest = jest.fn().mockResolvedValue(new Uint8Array([1, 2, 3]));
      global.crypto = {
        subtle: {
          digest: mockDigest
        }
      };

      const codeVerifier = Spotify.generateRandomString(128);
      const hash = await Spotify.generateCodeChallenge(codeVerifier);
      expect(isBase64Encoded(hash)).toBe(true);
    });
  });

  describe('authorize', () => {
    // ------- test3 generate authorizationUrl ------------
    it('test3 should construct the authorization URL', async () => {
    console.log("++++++++++++++++++++ LANCEMENT DU TEST : 3 ++++++++++++++++++++");
    const codeVerifier = Spotify.generateRandomString(128);
    const codeChallenge =  await Spotify.generateCodeChallenge(codeVerifier);

    let state = Spotify.generateRandomString(16);
    let scope = 'user-read-private user-read-email playlist-modify-public';
    const args = new URLSearchParams({
      response_type: 'code',
      client_id: clientId,
      scope: scope,
      redirect_uri: redirectUri,
      state: state, 
      code_challenge_method: 'S256',
      code_challenge: codeChallenge
    });
    
    const authorizationUrl = 'https://accounts.spotify.com/authorize?' + args;

    const originalLocation = { ...window.location };
    delete window.location;
    window.location = {
      href: authorizationUrl
    };

    console.log(" testlogThe URL to check is : " + authorizationUrl);
    console.log("test Tester l'url à la main");

    await Spotify.authorize();

    expect(window.location.href).toBeDefined();

  
    });
  });

  describe('getAccessToken', () => {
 

    beforeEach(() => {
        localStorage.setItem('access_token', null);
        localStorage.setItem('expiration_date', null);
        localStorage.setItem('refresh_token', null);
        localStorage.setItem('code_verifier', null);
        jest.spyOn(Spotify, 'refreshToken').mockImplementation((arg) => {
          if (arg == 'refresh1') {
            return 'newAccessTokenFrom-refresh1';
          } else if (arg === 'refresh2') {
            return 'newAccessTokenFrom-refresh2';
          } else {
            return 'need to auth to spotify, no access token returned';
          }
        });
      });

      afterEach(() => {
        localStorage.clear();
        jest.restoreAllMocks()
      });

    // ------- test4a with access_Token valid ------------ 
    it('test4a should return the valid existing access_Token', async () => {
      console.log("++++++++++++++++++++ LANCEMENT DU TEST : 4a ++++++++++++++++++++");
        localStorage.setItem('access_token', 'access-token-1');
        let access_Token = localStorage.getItem('access_token');
        const expirationDateAccessToken = Date.now() + 7200;
        localStorage.setItem('expiration_date', expirationDateAccessToken.toString());
        let now = Date.now() + 3600;

        const result = await Spotify.getAccessToken();
        expect(result).toBe('access-token-1');
    });

    // ------- test4b mocked refresh_Token returns access token based on argument value --------- 
    it('test4b should call refreshToken() with refresh_Token and return newAccessTokenFrom-refresh1', async () => {
      console.log("++++++++++++++++++++ LANCEMENT DU TEST : 4b ++++++++++++++++++++");
        localStorage.setItem('refresh_token', 'refresh1');
        let refresh_Token = localStorage.getItem('refresh_token');
        const expirationDateAccessToken = localStorage.getItem('expiration_date', Date.now() + 3600);
        let now = Date.now() + 7200;
        const result = await Spotify.getAccessToken();
        expect(result).toBe('newAccessTokenFrom-refresh1');

    });
   
    // ---- test4c with the code in the URL  with response ok ------- 
    it('test4c should retrieve access_token after fetching spotify', async () => {
      console.log("++++++++++++++++++++ LANCEMENT DU TEST : 4e ++++++++++++++++++++");
      localStorage.clear();
      localStorage.setItem('code_verifier', 'fake_codeverifier_64598')
      let codeverifier = localStorage.getItem('code_verifier', 'fake_codeverifier_64598');
      delete global.window.location;
    
      window.location = { search: '?code=fake_URL-code-545sdf54sdf587dsf2' };
    
      const queryString = window.location.search;
      console.log("test queryString vaut : " + queryString)
      const urlParams = new URLSearchParams(queryString);
      const codeFromUrl = urlParams.get('code');
      console.log("test codeFromUrl vaut : " + codeFromUrl)
    
      let redirectUri = 'https://localhost:3000';
      let clientId = "fake-ClientId-5423123454";
    
      // Espionner fetch
      jest.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({
          access_token: 'fakeAccessToken',
          refresh_token: 'fakeRefreshToken',
          expires_in: 3600 // Temps d'expiration simulé en secondes
        })
      });
    
      const result = await Spotify.getAccessToken();
    
      expect(fetch).toHaveBeenCalledWith('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: expect.anything()
      });
      
      expect(result).toBe('fakeAccessToken');
    });

    // ---- test4d with the code in the URL  with response nok ------- 
    it('test4d should throw an error for non-ok response', async () => {
      console.log("++++++++++++++++++++ LANCEMENT DU TEST : 4d ++++++++++++++++++++");
      localStorage.clear();
      localStorage.setItem('code_verifier', 'fake_codeverifier_64598')
      let codeverifier = localStorage.getItem('code_verifier', 'fake_codeverifier_64598');
      delete global.window.location;

      window.location = { search: '?code=fake_URL-code-545sdf54sdf587dsf2' };

      jest.spyOn(global, 'fetch').mockResolvedValue({
        ok: false, // Réponse non ok
        status: 400
      });

      const consoleSpy = jest.spyOn(console, 'log');
      const errorSpy = jest.spyOn(console, 'error');

      try {
        await Spotify.getAccessToken();
        expect(consoleSpy).toHaveBeenCalledWith("There was a problem exchanging the code for a token: 400");
        expect(errorSpy).toHaveBeenCalledWith("An error occurred while exchanging the code for a token: Error: There was an error during token exchange");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe("There was an error during token exchange");
      }
    });

    // ---- test4e should call authorize() when there is no code in the URL -------
    it('test4e should call authorize() when there is no code in the URL', async () => {
  console.log("++++++++++++++++++++ LANCEMENT DU TEST : 4e ++++++++++++++++++++");
  localStorage.clear();
  delete global.window.location;

  window.location = { search: '' }; 

  const authorizeSpy = jest.spyOn(Spotify, 'authorize');

  await Spotify.getAccessToken();

  expect(authorizeSpy).toHaveBeenCalled();
    });


  });

  describe('refreshToken', () => {

    // ------- test5a calls refreshToken with refToken and receives an "ok" response ------------
    it('test5a should return new access_token from fetch when response is "ok"', async () => {
      console.log("++++++++++++++++++++ LANCEMENT DU TEST : 5a ++++++++++++++++++++");
  
      localStorage.clear();
  
      jest.restoreAllMocks();
  
      localStorage.setItem('refresh_token', 'refresh1');
  
      jest.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({
          access_token: 'newAccessTokenFromFetch',
          refresh_token: 'newRefreshTokenFromFetch',
          expires_in: 3600
        })
      });
  
      const result = await Spotify.refreshToken('refresh1');
  
      expect(fetch).toHaveBeenCalledWith('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: expect.anything()
      });
  
      expect(result).toBe('newAccessTokenFromFetch');
    });
  
    // ------- test5b calls refreshToken with refToken and receives a non-ok response ------------
    it('test5b should throw an error for non-ok response', async () => {
      console.log("++++++++++++++++++++ LANCEMENT DU TEST : 5b ++++++++++++++++++++");
  
      localStorage.clear();
  
      jest.restoreAllMocks();
  
      localStorage.setItem('refresh_token', 'refresh2');
  
      jest.spyOn(global, 'fetch').mockResolvedValue({
        ok: false, 
        status: 400
      });
  
      try {
        await Spotify.refreshToken('refresh2');
        
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe("An error occurred during token refresh");
      }
    });
  });
  

  describe('search', () => {

    beforeEach(() => {
      localStorage.clear();
      let word = "fake-word-search";
    });
  
    afterEach(() => {
      localStorage.clear();
      jest.restoreAllMocks();
    });
  
    // ------- test 6a response ok with results----------
    it('test6a should return search results', async () => {
    console.log("++++++++++++++++++++ LANCEMENT DU TEST : 6a ++++++++++++++++++++");
    localStorage.clear();

    const expectedResults = [
      { name: 'Song 1', artist: 'Artist 1', album: 'Album 1', uri: 'uri1', id: 'id1' },
      { name: 'Song 2', artist: 'Artist 2', album: 'Album 2', uri: 'uri2', id: 'id2' }
    ];


    jest.spyOn(Spotify, 'getAccessToken').mockResolvedValue('fakeAccessToken6a');
    jest.spyOn(global, 'fetch').mockResolvedValue({
    ok: true,
    json: async () => ({
      tracks: {
        items: [
          { name: 'Song 1', artists: [{ name: 'Artist 1' }], album: { name: 'Album 1' }, uri: 'uri1', id: 'id1' },
          { name: 'Song 2', artists: [{ name: 'Artist 2' }], album: { name: 'Album 2' }, uri: 'uri2', id: 'id2' },
        ],
      },
    }),
      });
    
      

      const result = await Spotify.search();
      expect(result).toEqual(expectedResults); 
    });

  
    // ------- test 6b response ok with no results (empty array) ----------
    it('test6b should return empty array', async () => {
      console.log("++++++++++++++++++++ LANCEMENT DU TEST : 6b ++++++++++++++++++++");
  
      localStorage.clear();
  
      jest.spyOn(Spotify, 'getAccessToken').mockResolvedValue('fakeAccessToken6b');

      jest.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({})
        });

        const result = await Spotify.search();

        expect(result).toEqual([]);
      });

     // ------- test 6c with response nok ----------
    it('test6c should throw an error when fetch', async () => {
      console.log("++++++++++++++++++++ LANCEMENT DU TEST : 6c ++++++++++++++++++++");
  
      localStorage.clear();
  
      jest.spyOn(Spotify, 'getAccessToken').mockResolvedValue('fakeAccessToken6c');
  
      jest.spyOn(global, 'fetch').mockResolvedValue({
        ok: false,
        status: 500
      });
  
      jest.spyOn(console, 'error');
  
      try {
        await Spotify.search('song');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('An error occurred during the search');
  
      }
      });

    

  });


  describe('savePlaylist', () => {
    
    beforeEach(() => {
      localStorage.clear();
      jest.spyOn(Spotify, 'getAccessToken').mockResolvedValue('fakeAccessToken6c');
    });

    afterEach(() => {
      localStorage.clear();
      jest.restoreAllMocks();
    });

    // ------- test 7a successfully adds tracks to playlist ----------
    it('test7a should generate a playlist with the specified name and tracks', async () => {

      console.log("++++++++++++++++++++ LANCEMENT DU TEST : 7a ++++++++++++++++++++");
  
      jest.spyOn(global, 'fetch').mockImplementation((url, options) => {
        if ("url commence par https://api.spotify.com/v1/me") {
          // retourner la data simulée;
        } else if ("url commence par https://api.spotify.com/v1/users/") {
          // retourner les données simulées pour ensuite avoir playlistID qui vaut quelque chose
        } else {
          return 'need to auth to spotify, no access token returned';
        }
      });
  
      
  
      

    });
    
    // ------- test 7b get error when trying to add tracks to playlist ----------
    it('test7b should generate a error when adding tracks to playlist', async () => {

      console.log("++++++++++++++++++++ LANCEMENT DU TEST : 7b ++++++++++++++++++++");
  
      jest.spyOn(global, 'fetch').mockImplementation((url, options) => {
        if ("url commence par https://api.spotify.com/v1/me") {
          // retourner la data simulée;
        } else if ("url commence par https://api.spotify.com/v1/users/") {
          // retourner les données simulées pour ensuite avoir playlistID qui vaut quelque chose
        } else  if ("url commence par https://api.spotify.com/v1/playlists/") {
          // retourner les donnée simulées 
        }
      });
  
      
    
      

    });

    // ------- test 7c get error when trying to retrieve playlistId ----------
    it('test7c should generate an error when trying to get playlistId', async () => {

      console.log("++++++++++++++++++++ LANCEMENT DU TEST : 7c ++++++++++++++++++++");
  
      jest.spyOn(global, 'fetch').mockImplementation((url, options) => {
        if ("url commence par https://api.spotify.com/v1/me") {
          // retourner la data simulée;
        } else if ("url commence par https://api.spotify.com/v1/users/") {
          // retourner les données simulées pour ensuite avoir playlistID qui vaut quelque chose
        } else {
          return 'need to auth to spotify, no access token returned';
        }
      });
  
      
    
      

    });

  });
  

});
