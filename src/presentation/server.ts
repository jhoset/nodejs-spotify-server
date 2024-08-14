import express, {Router} from 'express';

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
        //? Middlewares Setup
        //* Setting up middleware functions to parse incoming Request Bodies
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));

        //? Routes Setup
        //* It tells Express App to use 'this.routes' for handling incoming requests.
        this.app.use(this.routes);

        //? Server Initialization
        this.app.listen(this.port, () => {
            console.log(`Server running on port: ${this.port}`);
        })
    }

}