import fs from "node:fs/promises";
import path from "node:path";

import Movie from "../db/Movie.js";

const postersDir = path.resolve("public", "posters");

export const getMovies = query => Movie.findAll({
    where: query
}); 

export const getMovie = query => Movie.findOne({
    where: query
});

export const addMovie = async (payload, file) => {
    let poster = null;
    if(file) {
        const newPath = path.join(postersDir, file.filename);
        await fs.rename(file.path, newPath);
        poster = path.join("posters", file.filename);
    }

    return Movie.create({...payload, poster});
};

export const updateMovie = async(query, payload)=> {
    const movie = await getMovie(query);
    if(!movie) return null;

    await movie.update(payload);
    return movie;
}

export const deleteMovie = async query => {
    const movie = await getMovie(query);
    if(!movie) return null;

    await movie.destroy();
    return movie;
}