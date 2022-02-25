
import BaseController from "./BaseController.js";

import authServiceIns from "./../services/AuthService.js";

class AuthController extends BaseController {

  constructor() {
    super();
  }

  async signUp(req, res) {
    console.log('sign up');
    let result = await authServiceIns.signUp(req.body);
    return result;
  }
}

export const authControllerIns = new AuthController();