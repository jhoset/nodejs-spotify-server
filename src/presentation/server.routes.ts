import {Router} from "express";
import {AuthRoutes} from "./auth/auth.routes";
import {TrackRoutes} from "./track/track.routes";

export class ServerRoutes {
    static get routes(): Router {
        const router = Router();

        router.use('/api/auth', AuthRoutes.routes);
        router.use('/api/track-preview', TrackRoutes.routes);

        return router;
    }
}