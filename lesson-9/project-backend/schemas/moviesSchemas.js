import Joi from "joi";

import { movieTypes } from "../constants/movie-constants.js";

export const movieAddSchema = Joi.object({
    title: Joi.string().required(),
    director: Joi.string().required(),
    favorite: Joi.boolean(),
    type: Joi.string().valid(...movieTypes),
    releaseYear: Joi.number().required(),
});

export const movieUpdateSchema = Joi.object({
    title: Joi.string(),
    director: Joi.string(),
    favorite: Joi.boolean(),
    type: Joi.string().valid(...movieTypes),
    releaseYear: Joi.number(),
});
