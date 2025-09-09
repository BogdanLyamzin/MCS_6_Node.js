import express from "express";

import authenticate from "../middlewares/authenticate.js";

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

authRouter.get("/current", authenticate, authControllers.getCurrentController);

authRouter.post("/logout", authenticate, authControllers.logoutController);

export default authRouter;
