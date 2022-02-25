
class ResponseHelper {

  constructor() {
  }

  sendSuccessResponse(req, res, response) {
    res.send(response);
  }

  sendErrorResponse(req, res, error) {
    res.send(error);
  }
}

export const responseHelperIns = new ResponseHelper();