import mongoose from "mongoose";

const { Schema } = mongoose;

const thingsSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
});

export default mongoose.model("Thing", thingsSchema);