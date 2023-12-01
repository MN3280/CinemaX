"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const ticket = require("../data/ticket.json");
    ticket.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      el.date = new Date();
    });
    await queryInterface.bulkInsert("Tickets", ticket, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Tickets", ticket, {});
  },
};
