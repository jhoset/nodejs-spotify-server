import {Router} from "express";
import {AuthRoutes} from "./auth/auth.routes";

export class ServerRoutes {
    static get routes(): Router {
        const router = Router();

        router.use('/api/auth', AuthRoutes.routes);

        return router;
    }
}