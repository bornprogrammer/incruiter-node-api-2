import OauthServer from "oauth2-server";
import OAuthModel from "./OAuthModel.js";

const setupOAuthServer = new OauthServer({
  model: OAuthModel,
});

export default setupOAuthServer;