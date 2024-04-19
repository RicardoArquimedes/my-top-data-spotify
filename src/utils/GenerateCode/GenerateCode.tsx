// Función para generar un código verificador y un código desafío
export function generateCodeChallenge() {
    const randomString = () => {
      const array = new Uint32Array(28);
      window.crypto.getRandomValues(array);
      return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
    };
  
    const verifier = randomString();
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier))
      .then(buffer => {
        return btoa(String.fromCharCode(...new Uint8Array(buffer)))
          .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      })
      .then(challenge => ({ verifier, challenge }));
  }
  