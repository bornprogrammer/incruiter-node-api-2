import responseHelperIns from "../helpers/ResponseHelper.js";

export default class BaseMiddleware {

  handle(req, res, middlewareOptions) {
  }

  invoke(middlewareOptions) {
    return (req, res, next) => {
      try {
        this.handle(req, res, middlewareOptions);
        next();
      } catch (error) {
        // responseHelperIns.sendErrorResponse(req, res, error);
      }
    }
  }

}