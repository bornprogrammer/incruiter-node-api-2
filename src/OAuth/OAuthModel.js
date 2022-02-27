import _ from "lodash";
import bcrypt from "bcrypt";
import config from "config";
import JWT from "jsonwebtoken";
import OAuthAccessToken from "../mongo-schemas/OAuthAccessToken.js";
import OAuthClient from "../mongo-schemas/OAuthClient.js";
import User from "../mongo-schemas/User.js";
import OAuthRefreshToken from "../mongo-schemas/OAuthRefreshToken.js";

const TOKEN_TYPE = {
  access: "access_token",
  refresh: "refresh_token",
};

class OAuthModel {

  getAccessToken(bearerToken) {
    return OAuthAccessToken.findOne({ accessToken: bearerToken }).populate("User").then((accessToken) => {
      if (!accessToken) {
        return false;
      }
      const token = accessToken;
      token.user = token.User;
      token.client = token.OAuthClient;
      // token.scope = token.scope;
      token.accessTokenExpiresAt = token.expires;
      return token;
    }).catch((error) => {
      console.log("getAccessToken", error);
    })
  }

  generateJWTToken(payload, tokenType) {
    const expiration = new Date();
    const jwtOptions = { algorithm: "RS256" };
    let secretJWTKey = "";
    // eslint-disable-next-line no-param-reassign
    payload.iss = config.get("jwt_issuer");
    if (tokenType === TOKEN_TYPE.access) {
      secretJWTKey = config.get("jwt_access_token_secret");
      expiration.setSeconds(expiration.getSeconds() + config.get("jwt_access_token_expiry_seconds"));
    } else {
      secretJWTKey = config.get("jwt_refresh_token_secret");
      expiration.setSeconds(expiration.getSeconds() + config.get("jwt_refresh_token_expiry_seconds"));
    }
    // eslint-disable-next-line no-param-reassign
    payload.exp = expiration.getTime();
    return JWT.sign(payload, secretJWTKey);
  }

  verifyJWTToken(bearerToken, tokenType) {
    try {
      const secretJWTKey = tokenType === TOKEN_TYPE.access ? config.get("jwt_access_token_secret") : config.get("jwt_refresh_token_secret");
      const decoded = JWT.verify(bearerToken, secretJWTKey);
      return {
        expires: new Date(decoded.exp),
        // user: getUserById(decoded.userId),
      };
    } catch (error) {
      return error;
    }
  }

  generateAccessToken(client, user, scope) {
    const jwtPayload = { _id: user.id, username: user.email, name: user.name };
    const accessToken = this.generateJWTToken(jwtPayload, TOKEN_TYPE.access);
    return accessToken;
  }

  generateRefreshToken(client, user, scope) {
    const jwtPayload = { _id: user.id, username: user.email, name: user.name };
    const accessToken = this.generateJWTToken(jwtPayload, TOKEN_TYPE.refresh);
    return accessToken;
  }

  getClient(clientId, clientSecret) {
    const options = { client_id: clientId };
    if (clientSecret) options.client_secret = clientSecret;

    return OAuthClient
      .findOne(options)
      .then((client) => {
        if (!client) return new Error("client not found");
        const clientWithGrants = client
        clientWithGrants.grants = ["authorization_code", "password", "refresh_token", "client_credentials"]
        // Todo: need to create another table for redirect URIs
        clientWithGrants.redirectUris = [clientWithGrants.redirect_uri]
        delete clientWithGrants.redirect_uri
        // clientWithGrants.refreshTokenLifetime = integer optional
        // clientWithGrants.accessTokenLifetime  = integer optional
        return clientWithGrants
      }).catch((err) => {
        console.log("getClient - Err: ", err)
      });
  }

  getUser(username, password) {
    return User
      .findOne({ email: username })
      .then(async (user) => {
        console.log("my data", user.email, user.id, user.password);
        const validPassword = await bcrypt.compare(password, user.password);
        return validPassword ? user : false;
      })
      .catch((err) => {
        console.log("getUser - Err: ", err);
      });
  }

  revokeToken(token) {
    console.log("revokeToken", token)
    return OAuthRefreshToken.findOne({
      where: {
        refresh_token: token.refreshToken,
      },
    }).then((rT) => {
      if (rT) rT.destroy();
      /** *
       * As per the discussion we need set older date
       * revokeToken will expected return a boolean in future version
       * https://github.com/oauthjs/node-oauth2-server/pull/274
       * https://github.com/oauthjs/node-oauth2-server/issues/290
       */
      const expiredToken = token
      expiredToken.refreshTokenExpiresAt = new Date("2015-05-28T06:59:53.000Z")
      return expiredToken
    }).catch((err) => {
      console.log("revokeToken - Err: ", err)
    });
  }

  saveToken(token, client, user) {
    console.log("saveToken", token, client, user);
    return Promise.all([
      OAuthAccessToken.create({
        accessToken: token.accessToken,
        expires: token.accessTokenExpiresAt,
        OAuthClient: client.id,
        User: user.id,
        scope: token.scope,
      }),
      token.refreshToken ? OAuthRefreshToken.create({ // no refresh token for client_credentials
        refreshToken: token.refreshToken,
        expires: token.refreshTokenExpiresAt,
        OAuthClient: client.id,
        User: user.id,
        scope: token.scope,
      }) : [],

    ])
      .then((resultsArray) => _.assign(  // expected to return client and user, but not returning
        {
          client,
          user,
          access_token: token.accessToken, // proxy
          refresh_token: token.refreshToken, // proxy
        },
        token,
      ))
      .catch((err) => {
        console.log("revokeToken - Err: ", err)
      });
  }

  // getUserFromClient(client) {
  //   console.log("getUserFromClient", client)
  //   var options = { client_id: client.client_id };
  //   if (client.client_secret) options.client_secret = client.client_secret;

  //   return OAuthClient
  //     .findOne(options)
  //     .populate('User')
  //     .then(function (client) {
  //       console.log(client)
  //       if (!client) return false;
  //       if (!client.User) return false;
  //       return client.User;
  //     }).catch(function (err) {
  //       console.log("getUserFromClient - Err: ", err)
  //     });
  // }

  getRefreshToken(refreshToken) {
    console.log("getRefreshToken", refreshToken)
    if (!refreshToken || refreshToken === "undefined") return false
    // [OAuthClient, User]
    return OAuthRefreshToken
      .findOne({ refreshToken })
      .populate("User")
      .populate("OAuthClient")
      .then((savedRT) => {
        console.log("srt", savedRT)
        const tokenTemp = {
          user: savedRT ? savedRT.User : {},
          client: savedRT ? savedRT.OAuthClient : {},
          refreshTokenExpiresAt: savedRT ? new Date(savedRT.expires) : null,
          refreshToken,
          refresh_token: refreshToken,
          scope: savedRT.scope,
        };
        return tokenTemp;

      }).catch((err) => {
        console.log("getRefreshToken - Err: ", err)
      });
  }

  validateScope(user, client) {
    return user.scope === client.scope;
  }

  verifyScope(token, scope) {
    console.log("verifyScope", token, scope);
    return token.scope === scope;
  }
}

export default new OAuthModel();