import {envs} from './config';
import {Server} from "./presentation/server";
import {ServerRoutes} from "./presentation/server.routes";

(async () => {
    await main();
})();

async function main() {
    const server = new Server({
        port: envs.port,
        routes: ServerRoutes.routes
    })

    await server.start();
}