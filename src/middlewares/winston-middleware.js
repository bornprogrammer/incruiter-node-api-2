
import winston from "winston";

const winstonMiddleware = (app) => {

  app.use(winston('tiny'));

};

module.exports = winstonMiddleware;