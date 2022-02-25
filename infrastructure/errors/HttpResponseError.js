
export default class HttpResponseError extends Error {
  code;
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}