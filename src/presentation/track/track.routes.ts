import {Router} from "express";
import {TrackController} from "./track.controller";

export class TrackRoutes {
    public static get routes(): Router {
        const router = Router();
        const controller = new TrackController();

        router.get('/:id', controller.getPreviewUrl);

        return router;

    }
}