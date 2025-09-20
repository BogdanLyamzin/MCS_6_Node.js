import express from "express";

import authenticate from "../middlewares/authenticate.js";

import authControllers from "../controllers/authControllers.js";

import valdateBody from "../helpers/validateBody.js";

import { registerSchema, verifySchema, loginSchema } from "../schemas/authSchemas.js";
import validateBody from "../helpers/validateBody.js";

const authRouter = express.Router();

//signup
authRouter.post(
  "/register",
  valdateBody(registerSchema),
  authControllers.registerController
);

authRouter.post("/verify", validateBody(verifySchema), authControllers.resendVerifyController);

authRouter.get("/verify/:verificationCode", authControllers.verifyController);

//signin
authRouter.post(
  "/login",
  valdateBody(loginSchema),
  authControllers.loginController
);

authRouter.post("/refresh", authControllers.refreshController);

authRouter.get("/current", authenticate, authControllers.getCurrentController);

authRouter.post("/logout", authenticate, authControllers.logoutController);

export default authRouter;
