
import BaseController from "./BaseController.js";

class UserController extends BaseController {

  constructor() {
    super();
  }

  async getUser(req, res) {
    return { day: "not happy today" };
  }
}

export const userControllerIns = new UserController();