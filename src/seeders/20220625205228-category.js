'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let d = new Date(); 
    let date = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
   await queryInterface.bulkInsert('activityTypes', [
     {
       name: "Topic 1",
       description: "A nice topic.",
       updatedAt: date,
       createdAt: date
     },
     {
      name: "Topic 2",
      description: "A interesting topic.",
      updatedAt: date,
      createdAt: date
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('events', null, {})
  }
};
