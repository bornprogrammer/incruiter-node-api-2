
import BaseController from "./BaseController.js";

import authServiceIns from "./../services/AuthService.js";

import { signUpSchema, loginSchema } from "./../joi-validation-schemas/authValidatonSchema.js";

import joiValidationHelper from "../../infrastructure/helpers/joiValidationHelper.js";

class AuthController extends BaseController {

  constructor() {
    super();
  }

  async signUp(req, res) {
    let validatedValue = joiValidationHelper(signUpSchema, req.body);
    let result = await authServiceIns.signUp(validatedValue);
    return result;
  }
}

export const authControllerIns = new AuthController();