// spotify.test.js
import { Spotify } from './spotify';




describe('Spotify', () => {
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

  // describe('authorize', () => {
  //   it('opens new window to spotify auth page', () => {
  //     const variable =;
  //     const other_var = Spotify.authorize();
  //     expect(randomString.length).toBe(length);
  //   });
  // });

  // describe('getAccessToken', () => {
  //   it('returns access_token and refresh_token', () => {
  //     const variable =;
  //     const other_var = Spotify.getAccessToken();
  //     expect().toBe();
  //   });
  // });

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


