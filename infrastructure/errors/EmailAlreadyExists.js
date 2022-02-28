
import ConfictError from "./ConfictError.js";

export default class EmailAlreadyExists extends ConfictError {

  constructor() {
    super("Email is already exists");
  }
}