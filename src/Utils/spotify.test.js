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

  // describe('generateCodeChallenge', () => {
  //   it('returns a hashBase64 code', () => {
  //     const codeVerifier =;
  //     const other_var = Spotify.function(codeVerifier);
  //     expect().toBe();
  //   });
  // });

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


