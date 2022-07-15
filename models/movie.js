'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Movie.init({
    adult: DataTypes.BOOLEAN,
    backdrop_path: DataTypes.STRING,
    id: { type: DataTypes.INTEGER, primaryKey: true },
    original_language: DataTypes.STRING,
    original_title: DataTypes.STRING,
    overview: DataTypes.TEXT,
    popularity: DataTypes.DOUBLE,
    poster_path: DataTypes.STRING,
    release_date: DataTypes.DATE,
    title: DataTypes.STRING,
    video: DataTypes.BOOLEAN,
    vote_average: DataTypes.DOUBLE,
    vote_count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};