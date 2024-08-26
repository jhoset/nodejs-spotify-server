import {Request, Response} from "express";
import axios from "axios"
import jsdom from 'jsdom';
import {TrackService} from "../../domain/services/track.service";
import {handleError} from "../../domain/helpers";

const {JSDOM} = jsdom;

export class TrackController {

    constructor(private readonly trackService: TrackService) {
    }

    public getPreviewUrl = async (req: Request, res: Response) => {
        this.trackService.getPreviewUrl(req.params['id'])
            .then(result => res.status(200).send(result))
            .catch(error => handleError(error, res));
    }
}