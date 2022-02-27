
import HttpResponseError from "./HttpResponseError.js";
import HttpResponseStatus from "../constants/HttpResponseStatus.js";

export default class ForbiddenError extends HttpResponseError {

  constructor(message) {
    const customMessage = message || "You are unauthorized to access the resources";
    super(customMessage, HttpResponseStatus.FORBIDDEN);
  }
}