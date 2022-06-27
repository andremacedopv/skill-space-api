'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let d = new Date(); 
    let date = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
   await queryInterface.bulkInsert('activityTypes', [
     {
       name: "Theorical",
       description: "Theorical activities.",
       updatedAt: date,
       createdAt: date
     },
     {
      name: "Practical",
      description: "Practical activities.",
      updatedAt: date,
      createdAt: date
    },
    {
      name: "Events",
      description: "Events activities.",
      updatedAt: date,
      createdAt: date
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('events', null, {})
  }
};
