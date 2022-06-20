'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('eventFeedbacks', {
      description: {
          type: Sequelize.TEXT,
          allowNull: false
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onDelete: 'cascade',
        primaryKey: true
      },
      eventId: {
        type: Sequelize.INTEGER,
        references: { model: 'events', key: 'id' },
        onDelete: 'cascade',
        primaryKey: true
      },
      updatedAt: Sequelize.DATE,
      createdAt: Sequelize.DATE
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('eventFeedbacks');
  }
};
