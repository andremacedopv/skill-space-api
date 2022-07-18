'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('stageUsers', 
    'dateCompleted', {
      type: Sequelize.DATE
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'stageUsers',
      'dateCompleted',
    );
  }
};
