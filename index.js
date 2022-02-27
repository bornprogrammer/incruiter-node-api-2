import express from "express";

import config from "config";

import morgan from "morgan";

import fs from "fs";

import path from "path";

import { createLogger, transports } from "winston";

import cors from "cors";

import bodyParser from "body-parser";
import appRoutes from "./src/routes/index.js";

import { mongooseConnect } from "./src/database/mongooseConnect.js";

const app = express();

const logger = createLogger({
  transports: [
    new transports.Console(),
  ],
});

// const __dirname = path.resolve();
// var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// app.use(morgan('common', { stream: accessLogStream }));
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", appRoutes());

app.listen(config.get("port"), () => {
  mongooseConnect();
  logger.info("Server started at ")
  // console.log("server started attt", config.get("PORT"));
});
