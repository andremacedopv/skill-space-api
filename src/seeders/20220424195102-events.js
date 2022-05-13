'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let d = new Date(); 
    let date = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
   await queryInterface.bulkInsert('events', [
     {
       name: "Eventinho",
       description: "Evento interessante que ninguém vai querer perder.",
       date: '2022-09-11 17:00:00',
       remote: false,
       link: "google.com",
       updatedAt: date,
       createdAt: date
     }
   ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('events', null, {})
  }
};
