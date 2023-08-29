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
    let originalLocalStorage;

    beforeEach(() => {
      originalLocalStorage = window.localStorage;
      window.localStorage = {}; // Clear localStorage before each test
    });
  
    afterEach(() => {
      window.localStorage = originalLocalStorage; // Restore original localStorage
    });
  
    it('returns access_token when it is valid', async () => {
      window.localStorage.setItem('access_token', 'validAccessToken');
      const accessToken = await Spotify.getAccessToken();
      expect(accessToken).toBe('validAccessToken');
    });
  
    it('fetches a new access_token when it is expired and refresh_token is available', async () => {
      window.localStorage.setItem('access_token', 'expiredAccessToken');
      window.localStorage.setItem('refresh_token', 'validRefreshToken');
  
      // Simulate successful response
      const mockRefreshResponse = {
        ok: true,
        json: () => Promise.resolve({ access_token: 'newAccessToken' })
      };
      global.fetch = jest.fn().mockResolvedValueOnce(mockRefreshResponse);
  
      const accessToken = await Spotify.getAccessToken();
      expect(accessToken).toBe('newAccessToken');
    });
  
    it('calls authorize when both access_token and refresh_token are missing', async () => {
      jest.spyOn(Spotify, 'authorize').mockImplementationOnce(() => {});
      const accessToken = await Spotify.getAccessToken();
      expect(accessToken).toBeUndefined();
      expect(Spotify.authorize).toHaveBeenCalled();
    });
  });

  // describe('refreshToken', () => {
  //   it('returns new access_toekn and refresh_token from spotify', () => {
  //     const refToken =;
  //     const other_var = Spotify.refreshToken(refToken);
  //     expect().toBe();
  //   });
  // });

  // describe('displayObject', () => {
  //   it('displays the object returns by the fetch call', () => {
  //     const variable =;
  //     const other_var = Spotify.displayObject(obj);
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
  //   it('generates a random string of specified length', () => {
  //     const name = "playlist1";
  //     const tracks = [{}, {}, {}];
  //     const other_var = Spotify.savePlaylist(name, tracks);
  //     expect().toBe();
  //   });
  // });


});


