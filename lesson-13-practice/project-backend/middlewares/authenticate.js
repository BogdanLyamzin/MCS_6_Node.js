import HttpError from "../helpers/HttpError.js";
import { verifyToken } from "../helpers/jwt.js";

import { findUser } from "../services/authServices.js";

const authenticate = async (req, res, next) => {
  const {accessToken} = req.cookies;
  if (!accessToken) {
    throw HttpError(401, "Access token missing");
  }

  const { payload, error } = verifyToken(accessToken);
  if (error) {
    const errorMessage = error.message === "jwt expired" ? "AcessToken expired" : error.message;
    throw HttpError(401, errorMessage);
  }

  const user = await findUser({ id: payload.id });
  if (!user) {
    throw HttpError(401, "User not found");
  }
  req.user = user;
  next();
};

export default authenticate;
