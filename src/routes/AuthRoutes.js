import { authControllerIns } from "../controllers/AuthController.js";
import BaseRoutes from "./BaseRoutes.js";

class AuthRoutes extends BaseRoutes {

  constructor() {
    super();
  }

  setRoutes() {
    this.router.post('/signup', authControllerIns.invoke(authControllerIns.signUp));
    this.router.post('/oauth/token', authControllerIns.invoke(authControllerIns.signUp));
    return this.router;
  }
}

export const authRoutesIns = new AuthRoutes();