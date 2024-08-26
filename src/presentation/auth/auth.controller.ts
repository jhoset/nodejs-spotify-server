import {Request, Response} from "express";
import {AuthService} from "../../domain/services/auth.service";
import {envs} from "../../config";
import * as querystring from "node:querystring";
import {Constants, handleError} from "../../domain/helpers";
import {AuthorizationCallbackResponse, UserAuthorizationRequestParams} from "../../domain/interfaces";

export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    public login = (req: Request, res: Response) => {
        try {
            const queryParams: UserAuthorizationRequestParams = this.authService.buildUserAuthRequestParams();
            res.cookie(Constants.stateKey, queryParams.state);
            const targetUrl = `${envs.spotifyApiUrl}/authorize?${querystring.stringify({...queryParams})}`
            return res.redirect(targetUrl);
        } catch (error) {
            handleError(error, res);
        }
    }

    public handleCallback = async (req: Request, res: Response) => {
        const queryParams: AuthorizationCallbackResponse = req.query as any;
        const storedState: string = req.cookies ? req.cookies[Constants.stateKey] : null;
        try {
            const response = await this.authService.negotiateSpotifyAccessToken(queryParams, storedState);
            if (response.error) return res.redirect(`${envs.spotiAppClientUrl}?` + querystring.stringify({error: response.error}));
            res.clearCookie(Constants.stateKey);
            return res.redirect(`${envs.spotiAppClientUrl}?` + querystring.stringify({...response}));
        } catch (error) {
            handleError(error, res);
        }
    }

    public refreshToken = async (req: Request, res: Response) => {
        const refresh_token: any = req.query['refresh_token'];
        console.log('refresh_token', refresh_token);
        this.authService.negotiateNewAccessToken(refresh_token)
            .then(result => res.status(200).json(result))
            .catch(error => handleError(error, res));
    }
}