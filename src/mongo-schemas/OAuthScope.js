import mongoose from "mongoose";

const Schema = mongoose.Schema;

const oAuthScopeSchema = new Schema({
  scope: String,
  isDefault: Boolean
}, {
  timestamps: true
});

export default mongoose.model('OAuthScope', oAuthScopeSchema);