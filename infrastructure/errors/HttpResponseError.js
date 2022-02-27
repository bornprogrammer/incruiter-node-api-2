
export default class HttpResponseError extends Error {
  code;

  isHttpResponseError = true;

  constructor(message, code) {
    super(message);
    this.code = code;
  }
}