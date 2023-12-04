'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      seat_number: {
        type: Sequelize.STRING,
        allowNull: false
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      CustomerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Customers",
          key: "id"
        },
        onDelete: "cascade",
        onUpdate: "cascade"
      },
      MovieId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Movies",
          key: "id"
        },
        onDelete: "cascade",
        onUpdate: "cascade"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tickets');
  }
};