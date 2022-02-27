import express from "express";

import authRoutesIns from "./AuthRoutes.js";

import userRoutesIns from "./UserRoutes.js";

export default () => {
  const router = express.Router();
  router.use("/v1/auth", authRoutesIns.setRoutes());
  router.use("/v1/users", userRoutesIns.setRoutes());
  return router;
};