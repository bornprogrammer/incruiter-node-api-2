import mongoose from "mongoose";
import config from "config";

export const mongooseConnect = () => {

  mongoose.connect(config.get("MONGO_URI"), {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("Connected successfully");
  });
};