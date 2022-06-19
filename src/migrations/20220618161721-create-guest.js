'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('guests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      eventId: {
        type: Sequelize.INTEGER,
        references: { model: 'events', key: 'id' },
        onDelete: 'cascade',
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onDelete: 'cascade',
      },
      organizer: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      present: {
        type: Sequelize.BOOLEAN
      },
      status: {
        type: Sequelize.ENUM,
        values: ['Confirmed','Invitation Sent','Declined','Maybe','Invitation Pending'],
        allowNull: false
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
    await queryInterface.dropTable('guests');
  }
};