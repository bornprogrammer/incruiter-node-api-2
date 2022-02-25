import HttpResponseError from "./HttpResponseError.js";

import HttpResponseStatus from "./../../infrastructure/constants/HttpResponseStatus.js";

export default class BadRequestError extends HttpResponseError {

  constructor(message) {
    super(message, HttpResponseStatus.BAD_REQUEST);
  }
}