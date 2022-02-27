import express from "express";

export default class BaseRoutes {
  router;

  constructor() {
    this.router = express.Router();
  }

  setRoutes() {
    // child class will implement this method for registring the routes 
  }
}