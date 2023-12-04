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
      Movie.hasMany(models.Ticket, {foreignKey: "MovieId"})
    }
  }
  Movie.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        notNull: {
          msg: 'Title must be insert!'
        },
        notEmpty: {
          msg: 'Title must be insert!'
        }
      }
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        notNull: {
          msg: 'Genre must be insert!'
        },
        notEmpty: {
          msg: 'Genre must be insert!'
        }
      }
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validation: {
        notNull: {
          msg: 'Rating must be insert!'
        },
        notEmpty: {
          msg: 'Rating must be insert!'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};