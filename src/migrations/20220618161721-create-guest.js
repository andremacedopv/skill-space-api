'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('guests', {
      eventId: {
        type: Sequelize.INTEGER,
        references: { model: 'events', key: 'id' },
        onDelete: 'cascade',
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onDelete: 'cascade',
        primaryKey: true,
      },
      organizer: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      present: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      status: {
        type: Sequelize.ENUM,
        values: ['Confirmed','Invitation Sent','Declined','Maybe','Invitation Pending'],
        allowNull: false,
        defaultValue: 'Invitation Pending'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('guests');
  }
};