// spotify.test.js

import { Spotify } from './spotify';

global.fetch = require('node-fetch');


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
        // You can return a simple mock of Uint8Array here
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
    // Construct the authorization URL
    let state = Spotify.generateRandomString(16);
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

    console.log(" testlogThe URL to check is : " + authorizationUrl)
    console.log(" testlogManual verification needed: open URL in the browser and check if it works. \
    After being redirected on localhost from spotify, use the args in the url to test getAccessToken function "); 
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
      });

    // ------- test4a with access_Token valid ------------ 
    it('test4a should return the valid existing accessToken', async () => {
      console.log("++++++++++++++++++++ LANCEMENT DU TEST : 4a ++++++++++++++++++++");
        localStorage.setItem('access_token', 'access-token-1');
        let access_Token = localStorage.getItem('access_token');
        const expirationDateAccessToken = Date.now() + 7200;
        localStorage.setItem('expiration_date', expirationDateAccessToken.toString());
        let now = Date.now() + 3600;

        
        const result = await Spotify.getAccessToken();
        // Modify the expectation to match the actual access token value
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
      
      // Vérifiez que la fonction renvoie l'access_token simulé
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

      // Espionner fetch pour simuler une réponse non ok (status 400)
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
        // Le code devrait générer une erreur
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe("There was an error during token exchange");
      }
    });


   });



  // describe('refreshToken', () => {
  //   it('returns new access_toekn and refresh_token from spotify', () => {
  //     const refToken =;
  //     const other_var = Spotify.refreshToken(refToken);
  //     expect().toBe();
  //   });
  // });

  // describe('search', () => {
  //   it('returns results as object', () => {
  //     const variable =;
  //     const other_var = Spotify.search(word);
  //     expect().toBe();
  //   });
  // });

  // describe('savePlaylist', () => {
  //   it('generates a string of specified length', () => {
  //     const name = "playlist1";
  //     const tracks = [{}, {}, {}];
  //     const other_var = Spotify.savePlaylist(name, tracks);
  //     expect().toBe();
  //   });
  // });

    

});

  





