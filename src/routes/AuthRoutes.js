import { authControllerIns } from "../controllers/AuthController.js";
import BaseRoutes from "./BaseRoutes.js";
import oAuthAuthenticate from "../middlewares/OAuthAuthenticate.js";

class AuthRoutes extends BaseRoutes {

  setRoutes() {
    this.router.post("/signup", oAuthAuthenticate(), authControllerIns.invoke(authControllerIns.signUp));
    this.router.post("/oauth/token", authControllerIns.invoke(authControllerIns.authenticate));
    return this.router;
  }
}

export default new AuthRoutes();