'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('invitedSpeaker', { 
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
      job: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('invitedSpeakers');
  }
};
