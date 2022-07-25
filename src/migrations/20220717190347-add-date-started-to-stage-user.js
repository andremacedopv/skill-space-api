'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('stageUsers', 
    'dateStarted', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.DataTypes.NOW
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'stageUsers',
      'dateStarted',
    );
  }
};
