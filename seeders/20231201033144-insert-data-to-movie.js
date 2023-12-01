"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const movie = require("../data/movie.json");
    movie.forEach((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Movies", movie, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Movies", movie, {});
  },
};
