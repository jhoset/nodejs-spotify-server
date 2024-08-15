import {
    AccessTokenNegotiationResult,
    AuthorizationCallbackResponse,
    UserAuthorizationRequestParams
} from "../interfaces";
import {envs} from "../../config";
import {generateRandomString} from "../helpers";
import {AccessTokenRequest} from "../interfaces/spotify/access-token-request";
import axios from 'axios';
import {AccessTokenResponse} from "../interfaces/spotify/access-token-response";

export class AuthService {
    public buildUserAuthRequestParams(): UserAuthorizationRequestParams {
        const state = generateRandomString();
        const scopes: string = 'user-read-playback-state user-modify-playback-state user-read-currently-playing ' +
            'app-remote-control streaming playlist-read-private playlist-read-collaborative playlist-modify-private ' +
            'playlist-modify-public user-follow-modify user-follow-read user-library-modify user-library-read ' +
            'user-read-email user-read-private';

        return {
            response_type: 'code',
            client_id: envs.spotifyClientId,
            redirect_uri: `${envs.spotiAppServerUrl}/api/auth/callback`,
            scope: scopes,
            show_dialog: true,
            state,
        }
    }

    public async   negotiateSpotifyAccessToken(params: AuthorizationCallbackResponse, storedState: string): Promise<AccessTokenNegotiationResult> {
        if (params.error) return {error: params.error};
        if (!storedState || params.state !== storedState) return {error: 'state_mismatch'};
        if (!params.code) return {error: 'missing_spotify_auth_code'};
        let authOptions: AccessTokenRequest = {
            code: params.code,
            redirect_uri: `${envs.spotiAppServerUrl}/api/auth/callback`,
            grant_type: 'authorization_code'
        }

        const resp = await axios.post<AccessTokenResponse>(`${envs.spotifyApiUrl}/api/token`,
            authOptions,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + Buffer.from(`${envs.spotifyClientId}:${envs.spotifyClientSecret}`).toString('base64')
                },
            });
        return {
            accessToken: resp.data.access_token,
            refreshToken: resp.data.refresh_token,
        };
    }
}
