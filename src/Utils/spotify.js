const clientId = '58e94fb2fa6e4c598384c4b0ccb0d000';
const redirectUri = 'https://localhost:3000';


function generateRandomString(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    function base64encode(string) {
        return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);

    return base64encode(digest);
}

const Spotify = {
    async getAccessToken() {
        try {
            let codeVerifier = generateRandomString(128);
            let codeChallenge = await generateCodeChallenge(codeVerifier);

            let state = generateRandomString(16);
            let scope = 'user-read-private user-read-email';

            localStorage.setItem('code_verifier', codeVerifier);

            let args = new URLSearchParams({
                response_type: 'code',
                client_id: clientId,
                scope: scope,
                redirect_uri: redirectUri,
                state: state,
                code_challenge_method: 'S256',
                code_challenge: codeChallenge
            });

            const authorizationUrl = 'https://accounts.spotify.com/authorize?' + args;
            console.log("Authorization URL:", authorizationUrl);

            // Now you can use the authorizationUrl to redirect the user or open it in a browser.
            window.location = authorizationUrl;
            // After the user completes the authorization, you'll receive the authorization code
            const urlParams = new URLSearchParams(window.location.search);
            const authCode = urlParams.get('code');


            if (authCode) {
                console.log("The auth code is : " + authCode)
            } else {
                console.log('Authentication code not found in the URL.');
            }

                        // which you can then use to exchange for an access token.

                    } catch (error) {
                        console.log('Error:', error);
                    }
    },
    async requestAccessToken(authCode) {
        try {
            const codeVerifier = localStorage.getItem('code_verifier');
            const tokenEndpoint = 'https://accounts.spotify.com/api/token';

            const body = new URLSearchParams({
                grant_type: 'authorization_code',
                code: authCode,
                redirect_uri: redirectUri,
                client_id: clientId,
                code_verifier: codeVerifier,
            });

            const response = await fetch(tokenEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: body.toString(),
            });

            const data = await response.json();

            if (data.access_token) {
                const accessToken = data.access_token;
                const expiresIn = data.expires_in;
                // You can use the accessToken for making authenticated API requests to Spotify
                console.log("Access Token:", accessToken);
                console.log("Expires In:", expiresIn);
            } else {
                console.log('Access token not received.');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    }
}


export {Spotify};
  