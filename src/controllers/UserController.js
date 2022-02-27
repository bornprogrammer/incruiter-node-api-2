import BaseController from "./BaseController.js";
import userServiceIns from "../services/UserService.js";

class UserController extends BaseController {
  userService = userServiceIns;

  async getUser(req, res) {
    this.userService.getUser();
  }
}

export default new UserController();