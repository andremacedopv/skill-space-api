'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('events', [
     {
       name: "Eventinho",
       description: "Evento interessante que ninguém vai querer perder.",
       date: '2022-09-11 17:00:00',
       remote: false,
       link: "google.com"
     }
   ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('events', null, {})
  }
};
