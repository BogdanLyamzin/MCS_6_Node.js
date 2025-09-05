import { DataTypes } from "sequelize";

import sequelize from "./sequelize.js";

import { movieTypes } from "../constants/movie-constants.js";

const Movie = sequelize.define(
    "movie",
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        director: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        favorite: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        type: {
            type: DataTypes.ENUM(...movieTypes),
            defaultValue: movieTypes[0]
        },
        releaseYear: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id"
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE"
        }
    }
);

// Movie.sync({force: true});

export default Movie;