import fs from "node:fs/promises";

import Movie from "../db/Movie.js";

import cloudinary from "../helpers/cloudinary.js";

export const getMovies = query => Movie.findAll({
    where: query
}); 

export const getMovie = query => Movie.findOne({
    where: query
});

export const addMovie = async (payload, file) => {
    let poster = null;
    if(file) {
        const {url} = await cloudinary.uploader.upload(file.path, {
            folder: "posters",
            use_filename: true,
        });
        poster = url;
        await fs.unlink(file.path);
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