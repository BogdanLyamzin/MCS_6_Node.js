import Movie from "../db/Movie.js";

export const getMovies = query => Movie.findAll({
    where: query
}); 

export const getMovie = query => Movie.findOne({
    where: query
});

export const addMovie = payload => Movie.create(payload);

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