import {Router} from "express";
import {TrackController} from "./track.controller";
import {TrackService} from "../../domain/services/track.service";

export class TrackRoutes {
    public static get routes(): Router {
        const router = Router();
        const trackService: TrackService = new TrackService();
        const controller = new TrackController(trackService);

        router.get('/:id', controller.getPreviewUrl);

        return router;

    }
}