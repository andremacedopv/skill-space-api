'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('eventFeedbacks', 
    'anonymous', {
      type: Sequelize.BOOLEAN,
      allowNull: false
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'eventFeedbacks',
      'anonymous'
    );
  }
};
