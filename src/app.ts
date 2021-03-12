// ./src/app.ts
import * as express from "express";

import { Express, Response as ExResponse } from "express";
import {RegisterRoutes} from "./routes/routes";
import * as bodyParser from 'body-parser';

export function newApp(): Express {

    const app = express();

    app.use(bodyParser.json());

    RegisterRoutes(app);

    app.use(function notFoundHandler(_req, res: ExResponse) {
        res.status(404).send('ERROR');
    });

    return app;
}
