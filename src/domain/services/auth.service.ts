import {
    AccessTokenNegotiationResult, AccessTokenAuthOptions, AccessTokenResponse,
    AuthorizationCallbackResponse, RefreshTokenAuthOptions, RefreshTokenResponse,
    UserAuthorizationRequestParams
} from "../interfaces";
import {envs} from "../../config";
import {CustomError, generateRandomString} from "../helpers";
import axios from 'axios';

export class AuthService {
    public buildUserAuthRequestParams(): UserAuthorizationRequestParams {
        const state = generateRandomString();
        const scopes: string = 'user-read-recently-played user-read-playback-state user-modify-playback-state user-read-currently-playing ' +
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

    public async negotiateSpotifyAccessToken(params: AuthorizationCallbackResponse, storedState: string): Promise<AccessTokenNegotiationResult> {
        if (params.error) return {error: params.error};
        if (!storedState || params.state !== storedState) return {error: 'state_mismatch'};
        if (!params.code) return {error: 'missing_spotify_auth_code'};
        let authOptions: AccessTokenAuthOptions = {
            url: `${envs.spotifyApiUrl}/api/token`,
            data: {
                code: params.code,
                redirect_uri: `${envs.spotiAppServerUrl}/api/auth/callback`,
                grant_type: 'authorization_code'
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(`${envs.spotifyClientId}:${envs.spotifyClientSecret}`).toString('base64')
            },
        }

        const resp = await axios.post<AccessTokenResponse>(authOptions.url,
            authOptions.data, {headers: authOptions.headers,});

        if (resp.status !== 200 || !resp?.data?.access_token) return {error: 'failure_getting_access_token'}

        return {
            accessToken: resp.data.access_token,
            refreshToken: resp.data.refresh_token,
        };
    }

    public async negotiateNewAccessToken(refreshToken: string) {
        if (!refreshToken) throw CustomError.badRequest(`Refresh token is missing`);
        let authOptions: RefreshTokenAuthOptions = {
            url: `${envs.spotifyApiUrl}/api/token`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(`${envs.spotifyClientId}:${envs.spotifyClientSecret}`).toString('base64')
            },
            data: {
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
            }
        }

        const resp = await axios.post<RefreshTokenResponse>(authOptions.url,
            authOptions.data, {headers: authOptions.headers,});

        if (resp.status !== 200 || !resp?.data?.access_token) {
            throw CustomError.forbidden(`An error occurred trying to get access_token with provided refresh_token.`);
        }

        return {
            accessToken: resp.data?.access_token,
            refreshToken: resp.data?.refresh_token,
        };
    }
}
