
import morganM from "./morgan-middleware";

const registerMiddleware = (app) => {

  winstonMiddleware(app);

};

module.exports = registerMiddleware;