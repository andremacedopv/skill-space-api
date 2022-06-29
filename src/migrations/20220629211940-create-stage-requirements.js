'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('stageRequirements', {
      stageId: {
        type: Sequelize.INTEGER,
        references: { model: 'stages', key: 'id' },
        onDelete: 'cascade',
        primaryKey: true,
        allowNull: false,
      },
      requirementId: {
        type: Sequelize.INTEGER,
        references: { model: 'stages', key: 'id' },
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
    await queryInterface.dropTable('stageRequirements');
  }
};