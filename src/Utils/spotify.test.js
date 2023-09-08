// spotify.test.js

import { Spotify } from './spotify';


describe('Spotify', () => {

  const clientId = '58e94fb2fa6e4c598384c4b0ccb0d000';
  const redirectUri = 'https://localhost:3000';


  describe('generateRandomString', () => {
    it('generates a random string of specified length', () => {
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

    it('generates a challengeCode', async () => {

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
    it('constructs the authorization URL', async () => {
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

    console.log("The URL to check is : " + authorizationUrl)
    console.log("Manual verification needed: open URL in the browser and check if it works. \
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
            // Gérer d'autres cas ici si nécessaire
            return 'need to auth to spotify, no access token returned';
          }
        });
      });

    // ------- test with access_Token valid ------------
    it('should return the valid existing accessToken', async () => {
        localStorage.setItem('access_token', 'access-token-1');
        let access_Token = localStorage.getItem('access_token');
        const expirationDateAccessToken = Date.now() + 7200;
        localStorage.setItem('expiration_date', expirationDateAccessToken.toString());
        let now = Date.now() + 3600;

        
        const result = await Spotify.getAccessToken();
        // Modify the expectation to match the actual access token value
        expect(result).toBe('access-token-1');
    });

    // ------- test with refresh_Token which has been mocked to return an access token 
    // based on argument value ----------------- 
    it('should call refreshToken() with refresh_Token and return a new access token', async () => {
        localStorage.setItem('refresh_token', 'refresh1');
        let refresh_Token = localStorage.getItem('refresh_token');
        const expirationDateAccessToken = localStorage.getItem('expiration_date', Date.now() + 3600);
        let now = Date.now() + 7200;
        const result = await Spotify.getAccessToken();
        expect(result).toBe('newAccessTokenFrom-refresh1');

    });

    // ---- test fetch with response ok -------
    it('should returns a successful response', async () => {
      const response = { ok: true, status: 200 };
      global.fetch = jest.fn().mockResolvedValue(response);
    
      // Appeler la fonction qui effectue l'appel API
      const result = await Spotify.getAccessToken();
    
      try {
        await Spotify.getAccessToken();
      } catch (error) {
        expect(error).toBe();
      }
    });
    
    it('should returns an error response', async () => {
      const response = { ok: false, status: 400 };
      global.fetch = jest.fn().mockResolvedValue(response);
    
    
      try {
        await Spotify.getAccessToken();
      } catch (error) {
        expect(error).toBe();
      }
    });
  
    // test with the code in the URL. 
    it('should retrieve access_token by fetching spotify', async () => {
      const queryString = "?code=the-fake-code-from-the-url&client_id=005dfg52fg55ds215dsf5";
      const urlParams = new URLSearchParams(queryString);
      const codeFromUrl = urlParams.get('code');
      localStorage.setItem('code_verifier', 'fake_codeverifier_64598');
      let codeverifier = localStorage.getItem('code_verifier');
      console.log("URL code after redirect is : " + codeFromUrl);
      console.log("Code Verifier is: " + codeverifier);
      
      let redirectUri = 'https://localhost:3000';
      let clientId = "fakeClientId-5423123454";

      let body = new URLSearchParams({
        grant_type: 'authorization_code',
        code: codeFromUrl,
        redirect_uri: redirectUri,
        client_id: clientId,
        code_verifier: codeverifier
      });
  
      console.log("body vaut : " + body);

      const mockFetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          access_token: 'newAccessTokenFrom-refresh1'
        })
      });
      global.fetch = mockFetch;
    
      // Appeler la fonction getAccessToken
      const result = await Spotify.getAccessToken();
    
      // Vérifier que fetch a été appelé avec les bonnes données
      expect(mockFetch).toHaveBeenCalledWith('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body // Vous pouvez également vérifier le contenu exact ici si nécessaire
      });
    
      // Vérifier que le résultat est le bon access_token
      expect(result).toBe('newAccessTokenFrom-refresh1');
    

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


