
import userControllerIns from "../controllers/UserController.js";

import BaseRoutes from "./BaseRoutes.js";

class UserRoutes extends BaseRoutes {

  setRoutes() {
    this.router.get("/", userControllerIns.invoke(userControllerIns.getUser));
    return this.router;
  }
}

export default new UserRoutes();