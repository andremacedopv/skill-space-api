'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('chats', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('chats');
  }
};
