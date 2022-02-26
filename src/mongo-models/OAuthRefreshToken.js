import mongoose from "mongoose";

const Schema = mongoose.Schema;

const oAuthRefreshTokenSchema = new Schema({
  refreshToken: String,
  expires: Date,
  scope: String,
  User: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  OAuthClient: {
    type: Schema.Types.ObjectId,
    ref: 'OAuthClient'
  },
}, {
  timestamps: true
});

export default mongoose.model("OAuthRefreshToken", oAuthRefreshTokenSchema);