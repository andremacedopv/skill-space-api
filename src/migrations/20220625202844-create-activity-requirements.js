'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('activityRequirements', {
      activityId: {
        type: Sequelize.INTEGER,
        references: { model: 'activities', key: 'id' },
        onDelete: 'cascade',
        primaryKey: true,
        allowNull: false,
      },
      requirementId: {
        type: Sequelize.INTEGER,
        references: { model: 'activities', key: 'id' },
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
    await queryInterface.dropTable('activityRequirements');
  }
};