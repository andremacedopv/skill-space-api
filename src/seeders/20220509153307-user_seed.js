'use strict';
const bcrypt = require('bcryptjs')

module.exports = {
  async up (queryInterface, Sequelize) {
    let hashed = await bcrypt.hash('123456', 12)
    let d = new Date(); 
    let date = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
    await queryInterface.bulkInsert('users', [
      {
        name: "Admin",
        email: "admin@admin.com",
        password: hashed,
        cpf: "716.350.220-61",
        ddd: "61",
        phone: "99999-9999",
        birthdate: '1980-01-01 10:00:00',
        admin: true,
        owner: true,
        is_active: true,
        updatedAt: date,
        createdAt: date
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  }
};
