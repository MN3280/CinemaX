'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasMany(models.Ticket, {foreignKey: "customerId"})
    }
  }
  Customer.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        notNull: {
          msg: 'Name must be insert!'
        },
        notEmpty: {
          msg: 'Name must be insert!'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      unique: { msg: "Email already exists!" },
      validate: {
        notNull: {
          msg: 'Kindly insert your email'
        },
        notEmpty: {
          msg: 'Kindly insert your email'
        },
        isEmail: {
          msg: 'Invalid email format.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Kindly insert your password!'
        },
        notEmpty: {
          msg: 'Kindly insert your password!'
        },
        len: {
          args: [5],
          msg: "Password too short!"
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Phone number must be filled!",
        },
        notEmpty: {
          msg: "Phone number must be filled!",
        },
      },
    },
  }, {
    sequelize,
    modelName: 'Customer',
  });

  Customer.beforeCreate((cust) => {
    cust.password = hashPassword(cust.password)
  })
  return Customer;
};