import {Request, Response} from "express";

export class SpotifyController {
    constructor() {
    }

    public loginUser = (req: Request, res: Response) => {
        return res.status(201).json({data: 'Login User'})
    }
}