import OAuth2Server from "oauth2-server";

import oAuthSetupServer from "../OAuth/oAuthServer.js";

import ForbiddenError from "../../infrastructure/errors/ForbiddenError.js";

import responseHelperIns from "../../infrastructure/helpers/ResponseHelper.js";

const oAuthAuthenticate = (options) => (req, res, next) => {
  const { Request, Response } = OAuth2Server;

  const request = new Request({
    headers: { authorization: req.headers.authorization },
    method: req.method,
    query: req.query,
    body: req.body,
  });
  const response = new Response(res);
  oAuthSetupServer.authenticate(request, response, options)
    .then((token) => {
      // Request is authorized.
      req.user = token;
      next();
    })
    .catch((err) => {
      responseHelperIns.sendErrorResponse(req, res, new ForbiddenError(err.message));
    });
}

export default oAuthAuthenticate;
