import express from "express";

import authControllers from "../controllers/authControllers.js";

import valdateBody from "../helpers/validateBody.js";

import { registerSchema, loginSchema } from "../schemas/authSchemas.js";

const authRouter = express.Router();

//signup
authRouter.post(
  "/register",
  valdateBody(registerSchema),
  authControllers.registerController
);

//signin
authRouter.post(
  "/login",
  valdateBody(loginSchema),
  authControllers.loginController
);

export default authRouter;
