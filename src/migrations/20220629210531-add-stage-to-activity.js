'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('activities', 
    'StageId', {
      type: Sequelize.INTEGER,
      references: { model: 'stages', key: 'id' },
      onDelete: 'SET NULL',
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'activities',
      'stageId'
    );
  }
};
