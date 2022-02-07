// const express = require("express");
import express from "express";

import config from "config";

const app = express();

app.use("/", test);

app.listen(config.get("PORT"), () => {
  console.log("her");
});
