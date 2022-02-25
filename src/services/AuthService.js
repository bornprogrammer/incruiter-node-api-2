import BaseService from "./BaseService.js";

import User from "./../mongo-models/User.js";

class AuthService extends BaseService {

  constructor() {
    super();
  }

  async signUp(userData) {
    let userDetails = await User(userData).save();
    return userDetails;
  }
}

export default new AuthService();