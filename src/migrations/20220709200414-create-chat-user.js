'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('chatUsers', {
      chatId: {
        type: Sequelize.INTEGER,
        references: { model: 'chats', key: 'id' },
        onDelete: 'cascade',
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onDelete: 'cascade',
        primaryKey: true,
        allowNull: false,
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
    await queryInterface.dropTable('chatUsers');
  }
};