import { movieTypes } from "../constants/movie-constants.js";

export const getMoviesValidationController = (req, res)=> {
    res.json({
        movieTypes,
    })
}