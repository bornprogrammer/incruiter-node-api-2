import mongoose from "mongoose";

const { Schema } = mongoose;

const planSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  benefits: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model("Plan", planSchema);