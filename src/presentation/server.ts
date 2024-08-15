import express, {Router} from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";

interface ServerOptions {
    port: number,
    routes: Router,
}

export class Server {
    private readonly app = express();
    private readonly port: number;
    public readonly routes: Router;

    constructor(options: ServerOptions) {
        const {port, routes} = options;
        this.port = port;
        this.routes = routes;
    }

    public async start() {
        //? Body Parser Middlewares
        //* Parses incoming request bodies in JSON format.
        this.app.use(express.json());
        //* Parses incoming request bodies in URL-encoded format.
        //* Extended: true allows for richer objects and arrays to be parsed.
        this.app.use(express.urlencoded({extended: true}));

        //? CORS Middleware
        //* Important for allowing requests from different domains (e.g., your frontend).
        this.app.use(cors());

        //? Cookie Parser Middleware:
        //* Parses cookies from incoming requests and makes them available in req.cookies.
        this.app.use(cookieParser());

        //? Routes Setup
        //* This handles the mapping of different endpoints to their corresponding controllers/handlers.
        this.app.use(this.routes);

        //? Server Initialization
        //* Starts the Express server and listens on the specified port.
        this.app.listen(this.port, () => {
            console.log(`Server running on port: ${this.port}`);
        })
    }

}