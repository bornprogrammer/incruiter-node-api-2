
import HttpResponseStatus from "../../infrastructure/constants/HttpResponseStatus.js";
import HttpMethod from "../../infrastructure/constants/HttpMethod.js";
import mongoose from "mongoose";

class ResponseHelper {

  constructor() {
  }

  sendSuccessResponse(req, res, result) {
    let httpStatus = HttpResponseStatus.RESOURCES_FOUND;
    switch (req.method) {
      case HttpMethod.POST:
        httpStatus = HttpResponseStatus.RESOURCES_CREATED;
        break;
      case HttpMethod.DELETE:
        httpStatus = HttpResponseStatus.RESOURCES_DELETED;
        break;
      case HttpMethod.PUT:
        httpStatus = HttpResponseStatus.RESOURCES_CREATED;
        break;
      case HttpMethod.PATCH:
        httpStatus = HttpResponseStatus.RESOURCES_CREATED;
        break;
      default:
        break;
    }
    this.sendResponse(res, httpStatus, this.buildResponseSchema(result));
  }

  sendResponse(res, status, response) {
    res.status(status).send(response);
  }

  sendErrorResponse(req, res, error) {
    if (this.isMongooseError(error)) {
      this.sendResponse(res, 500, this.buildResponseSchema(null, error.message));
    } else if (this.isHttpResponseError(error)) {
      this.sendResponse(res, error.code, this.buildResponseSchema(null, error.message));
    }
  }

  isMongooseError(error) {
    return error instanceof mongoose?.Error?.ValidationError;
  }

  isHttpResponseError(error) {
    return error?.isHttpResponseError;
  }

  buildResponseSchema(result, message) {
    return { result, message: message || '' };
  }
}

export const responseHelperIns = new ResponseHelper();