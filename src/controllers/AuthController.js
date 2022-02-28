
import oauth2Server from "oauth2-server";
import BaseController from "./BaseController.js";

import authServiceIns from "../services/AuthService.js";

import { signUpSchema, loginSchema } from "../joi-validation-schemas/authValidatonSchema.js";

import joiValidationHelper from "../../infrastructure/helpers/joiValidationHelper.js";


import oAuthServerCon from "../OAuth/oAuthServer.js";

class AuthController extends BaseController {

  async signUp(req, res) {
    const validatedValue = joiValidationHelper(signUpSchema, req.body);
    const result = await authServiceIns.signUp(validatedValue);
    return result;
  }

  async authenticate(req, res) {
    const request = new oauth2Server.Request(req);
    const response = new oauth2Server.Response(res);
    const token = await oAuthServerCon.token(request, response);
    return token;
  }
}

export default new AuthController();