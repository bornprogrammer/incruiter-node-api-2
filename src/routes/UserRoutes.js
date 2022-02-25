import express from "express";

import { userControllerIns } from "../controllers/UserController.js";
import BaseRoutes from "./BaseRoutes.js";

class UserRoutes extends BaseRoutes {

  constructor() {
    super();
  }

  setRoutes() {
    this.router.get("/", userControllerIns.invoke(userControllerIns.getUser));
    return this.router;
  }
}

export const userRoutesIns = new UserRoutes();