'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('events', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: {
          type: Sequelize.STRING,
          allowNull: false
      },
      description: {
          type: Sequelize.TEXT,
          allowNull: false
      },
      date: {
          type: Sequelize.DATE,
          allowNull: false
      },
      remote: {
          type: Sequelize.BOOLEAN,
          allowNull: false
      },
      link: {
          type: Sequelize.STRING,
          allowNull: false
      },
      updatedAt: Sequelize.DATE,
      createdAt: Sequelize.DATE
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('event');
  }
};
