import {Router} from "express";
import {AuthController} from "./auth.controller";
import {AuthService} from "../../domain/services/auth.service";

export class AuthRoutes {
    public static get routes(): Router {
        const router = Router();
        const service = new AuthService();
        const controller = new AuthController(service);

        router.get('/login', controller.login);
        router.get('/callback', controller.handleCallback);

        return router;

    }
}