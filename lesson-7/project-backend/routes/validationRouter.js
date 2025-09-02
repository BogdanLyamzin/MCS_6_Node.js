import { Router } from "express";

import { getMoviesValidationController } from "../controllers/validationControllers.js";

const validationRouter = Router();

validationRouter.get("/movies", getMoviesValidationController);

export default validationRouter;