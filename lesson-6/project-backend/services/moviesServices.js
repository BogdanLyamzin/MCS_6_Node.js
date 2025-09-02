import Movie from "../db/Movie.js";

export const getMovies = ()=> Movie.findAll(); // SELECT * FROM movies;

export const getMovieById = id => Movie.findByPk(id);

export const addMovie = payload => Movie.create(payload);

export const updateMovieById = async(id, payload)=> {
    const movie = await getMovieById(id);
    if(!movie) return null;

    await movie.update(payload);
    return movie;
}

export const deleteMovieById = async id => {
    const movie = await getMovieById(id);
    if(!movie) return null;

    await movie.destroy();
    return movie;
}