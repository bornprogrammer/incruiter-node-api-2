import responseHelperIns from "../../infrastructure/helpers/ResponseHelper.js";

export default class BaseController {

  invoke(ctrlCallable) {
    return async (req, res) => {
      try {
        const result = await ctrlCallable(req, res);
        responseHelperIns.sendSuccessResponse(req, res, result);
      } catch (error) {
        console.log("invoked-error", error);
        responseHelperIns.sendErrorResponse(req, res, error);
      }
    };
  }
}