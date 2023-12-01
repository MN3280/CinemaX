'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ticket.belongsTo(models.Customer, {foreignKey: "customerId"})
      Ticket.belongsTo(models.Movie, {foreignKey: "movieId"})
    }
  }
  Ticket.init({
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Price cannot be blank!",
        },
        notEmpty: {
          msg: "Price cannot be blank!",
        },
      },
    },
    seat_number:{
     type: DataTypes.STRING,
     allowNull: false,
     validate: {
       notNull: {
         msg: "Please select the seat number!",
       },
       notEmpty: {
         msg: "Please select the seat number!",
       },
     },
    }, 
    date:{
      type: DataTypes.DATE,
      allowNull: false,
    }, 
    customerId:{
     type: DataTypes.INTEGER,
     allowNull: false,
    },
    movieId:{
     type: DataTypes.INTEGER,
     allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};