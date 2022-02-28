import BaseService from "./BaseService.js";

import User from "../mongo-schemas/User.js";

import EmailAlreadyExists from "../../infrastructure/errors/EmailAlreadyExists.js";

class AuthService extends BaseService {

  async signUp(userData) {
    const userDetails = await User.findOne({ email: userData.email });
    if (userDetails) {
      throw new EmailAlreadyExists();
    }
    const userCreated = await User(userData).save();
    return userCreated;
  }
}

export default new AuthService();