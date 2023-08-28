// spotify.test.js
import { Spotify } from '../src/Utils/spotify';

describe('Spotify', () => {
  describe('generateRandomString', () => {
    it('generates a random string of specified length', () => {
      const length = 10;
      const randomString = Spotify.generateRandomString(length);
      expect(randomString.length).toBe(length);
    });
  });

  // Ajoutez d'autres tests pour les autres fonctions de Spotify ici
});


