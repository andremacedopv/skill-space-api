'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('messages', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
      },
      chatId: {
        type: Sequelize.INTEGER,
        references: { model: 'chats', key: 'id' },
        onDelete: 'CASCADE',
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

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('messages');
  }
};
