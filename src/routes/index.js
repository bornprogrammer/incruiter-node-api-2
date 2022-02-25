import express from "express";

import { authRoutesIns } from "./authRoutes.js";

import { userRoutesIns } from "./userRoutes.js";

export const appRoutes = () => {
  const router = express.Router();
  router.use("/v1/auth", authRoutesIns.setRoutes());
  router.use("/v1/users", userRoutesIns.setRoutes());
  return router;
};