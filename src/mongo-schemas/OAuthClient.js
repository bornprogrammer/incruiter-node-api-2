import mongoose from "mongoose";

const { Schema } = mongoose;

const oAuthClientSchema = new Schema({
  name: String,
  clientId: String,
  clientSecret: String,
  redirectUri: String,
  grantTypes: String,
  scope: String,
  User: { type: Schema.Types.ObjectId, ref: "User" },
}, {
  timestamps: true,
});

export default mongoose.model("OAuthClient", oAuthClientSchema);