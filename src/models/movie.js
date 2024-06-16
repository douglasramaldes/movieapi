const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Movie = sequelize.define(
  "Movie",
  {
    name: { type: DataTypes.STRING, allowNull: false },
    genre: { type: DataTypes.STRING, allowNull: false },
    director: { type: DataTypes.STRING, allowNull: false },
    rating: { type: DataTypes.FLOAT, allowNull: false },
    cover: { type: DataTypes.STRING, allowNull: true },
    releaseYear: { type: DataTypes.INTEGER, allowNull: false },
    synopsis: { type: DataTypes.TEXT, allowNull: true },
    actors: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
  },
  {
    timestamps: true,
  }
);

module.exports = { Movie };