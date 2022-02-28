import mongoose from "mongoose";

const { Schema } = mongoose;

const oAuthAccessTokenSchema = new Schema({
  accessToken: {
    type: String,
    required: true,
  },
  expires: {
    type: Date,
    required: true,
  },
  scopes: {
    type: String,
  },
  User: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  OAuthClient: {
    type: Schema.Types.ObjectId,
    ref: "OAuthClient",
  },
}, {
  timestamps: true,
});

export default mongoose.model("OAuthAccessToken", oAuthAccessTokenSchema);