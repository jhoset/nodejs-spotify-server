import {Request, Response} from "express";
import {AuthService} from "../../domain/services/auth.service";
import {envs} from "../../config";
import * as querystring from "node:querystring";
import {Constants} from "../../domain/helpers";
import {AuthorizationCallbackResponse, UserAuthorizationRequestParams} from "../../domain/interfaces";
import {AccessTokenResponse} from "../../domain/interfaces/spotify/access-token-response";

export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    public login = (req: Request, res: Response) => {
        const queryParams: UserAuthorizationRequestParams = this.authService.buildUserAuthRequestParams();
        res.cookie(Constants.stateKey, queryParams.state);
        const targetUrl = `${envs.spotifyApiUrl}/authorize?${querystring.stringify({...queryParams})}`
        return res.redirect(targetUrl);
    }

    public handleCallback = async (req: Request, res: Response) => {
        const queryParams: AuthorizationCallbackResponse = req.query as any;
        const storedState: string = req.cookies ? req.cookies[Constants.stateKey] : null;
        const response = await this.authService.negotiateSpotifyAccessToken(queryParams, storedState);
        if (response.error) return res.redirect(`${envs.spotiAppClientUrl}?` + querystring.stringify({error: response.error}));
        res.clearCookie(Constants.stateKey);
        return res.redirect(`${envs.spotiAppClientUrl}?` + querystring.stringify({...response}));
    }
}