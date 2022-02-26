
import { responseHelperIns } from "../../infrastructure/helpers/ResponseHelper.js";

export default class BaseController {
  constructor() {
  }

  invoke(ctrlCallable) {
    return async (req, res) => {
      try {
        const result = await ctrlCallable(req, res);
        responseHelperIns.sendSuccessResponse(req, res, result);
      } catch (error) {
        responseHelperIns.sendErrorResponse(req, res, error);
      }
    };
  }
}