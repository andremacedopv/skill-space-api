'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('invitedSpeakerEvents', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      eventId: {
        type: Sequelize.INTEGER,
        references: { model: 'events', key: 'id' },
        onDelete: 'CASCADE',
      },
      invitedSpeakerId: {
        type: Sequelize.INTEGER,
        references: { model: 'invitedSpeakers', key: 'id' },
        onDelete: 'CASCADE',
      },
      updatedAt: Sequelize.DATE,
      createdAt: Sequelize.DATE
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('invitedSpeakerEvent');
  }
};
