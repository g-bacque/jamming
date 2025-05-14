import { generateRandomString, sha256, base64encode } from './Helpers';

const clientId = '9f4b295396164fb185a1622cb8dca3d3';
const redirectUri = 'http://127.0.0.1:3000';
const scope = 'playlist-modify-public';

export const redirectToSpotifyAuth = async () => {
  const codeVerifier = generateRandomString(128);
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64encode(hashed);

  localStorage.setItem('spotify_code_verifier', codeVerifier);

  const authUrl = new URL('https://accounts.spotify.com/authorize');
  authUrl.searchParams.append('client_id', clientId);
  authUrl.searchParams.append('response_type', 'code');
  authUrl.searchParams.append('redirect_uri', redirectUri);
  authUrl.searchParams.append('scope', scope);
  authUrl.searchParams.append('code_challenge_method', 'S256');
  authUrl.searchParams.append('code_challenge', codeChallenge);

  window.location = authUrl.toString();
};