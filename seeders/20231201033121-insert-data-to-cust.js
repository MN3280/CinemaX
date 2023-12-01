"use strict";

const { hashPassword } = require("../helpers/bcrypt");
const cust = require("../data/customer.json");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    cust.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      el.password = hashPassword(el.password);
    });

    await queryInterface.bulkInsert("Customers", cust, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Customers", null, {});
  },
};
