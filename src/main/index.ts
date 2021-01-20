import 'module-alias/register';
import { ExpressServer } from './server';
import { diseaseRoute } from "@src/main/router/v1";
import mongoose from "mongoose";
import config from "@src/main/config";

try {
    mongoose.connect(config.DATABASE_ADDR, {
        useNewUrlParser: true,
    });
} catch (error) {
    console.log('erro: '.concat(error));
}

const server = new ExpressServer(config.SERVER_PORT);

server.addRoutes('/api/disease', diseaseRoute);


server.start();



