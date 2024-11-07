import * as express from "express";

export const server = express();
export const port = 3000;
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
import {options} from './swagger'

const specs = swaggerJsdoc(options);

server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

server.use(express.json({ limit: '15mb' }));

import './endpoints/security';
import './endpoints/admin';
import './endpoints/private';
import './endpoints/public';
import './endpoints/eventHandler.ts';