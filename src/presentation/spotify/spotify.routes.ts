import {Router} from "express";
import {SpotifyController} from "./spotify.controller";

export class SpotifyRoutes {
    public static get routes(): Router {
        const router = Router();
        const controller = new SpotifyController();

        router.post('/login', controller.loginUser);

        return router;

    }
}