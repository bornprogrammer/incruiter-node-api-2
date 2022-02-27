
import BaseController from "./BaseController.js";

import authServiceIns from "./../services/AuthService.js";

import { signUpSchema, loginSchema } from "./../joi-validation-schemas/authValidatonSchema.js";

import joiValidationHelper from "../../infrastructure/helpers/joiValidationHelper.js";

import oauth2Server from "oauth2-server";

import oAuthServerCon from "../OAuth/oAuthServer.js";

class AuthController extends BaseController {

  constructor() {
    super();
  }

  async signUp(req, res) {
    let validatedValue = joiValidationHelper(signUpSchema, req.body);
    let result = await authServiceIns.signUp(validatedValue);
    return result;
  }

  async authenticate(req, res) {
    var request = new oauth2Server.Request(req);
    var response = new oauth2Server.Response(res);
    const token = await oAuthServerCon.token(request, response);
    return token;
  }
}

export const authControllerIns = new AuthController();