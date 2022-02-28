import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  tagline: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  ProductFeatures: {
    ref: "ProductFeature",
    type: [Schema.Types.ObjectId],
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model("Product", productSchema);