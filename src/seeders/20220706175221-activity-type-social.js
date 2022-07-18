'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let d = new Date(); 
    let date = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
   await queryInterface.bulkInsert('activityTypes', [
     {
       name: "Social",
       description: "Social activities.",
       updatedAt: date,
       createdAt: date
     },
   ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('activityTypes', null, {})
  }
};
