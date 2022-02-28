
import HttpResponseError from "./HttpResponseError.js";
import HttpResponseStatus from "../constants/HttpResponseStatus.js";

export default class ConfictError extends HttpResponseError {

  constructor(message) {
    const customMessage = message || "Resources is already exists,duplication is now allowed";
    super(customMessage, HttpResponseStatus.CONFLICT);
  }
}