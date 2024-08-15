import 'dotenv/config';
import {get} from 'env-var';

export const envs = {
    port: get('PORT').required().asPortNumber(),
    spotifyClientId: get('SPOTIFY_CLIENT_ID').required().asString(),
    spotifyClientSecret: get('SPOTIFY_CLIENT_SECRET').required().asString(),
    spotifyApiUrl: get('SPOTIFY_API_URL').required().asString(),
    spotiAppClientUrl: get('SPOTI_APP_CLIENT_URL').required().asString(),
    spotiAppServerUrl: get('SPOTI_APP_SERVER_URL').required().asString(),
}