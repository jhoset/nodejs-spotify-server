import {Router} from "express";
import {SpotifyRoutes} from "./spotify/spotify.routes";

export class ServerRoutes {
    static get routes(): Router {
        const router = Router();

        router.use('/api/spotify', SpotifyRoutes.routes);

        return router;
    }
}