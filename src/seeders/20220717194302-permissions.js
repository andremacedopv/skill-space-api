'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let d = new Date(); 
    let date = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
    await queryInterface.bulkInsert('permissions', [
     {
       name: "crud_stages",
       description: "Permissão de Ver, Criar, Editar e Deletar Estágios",
       updatedAt: date, createdAt: date
     },
     {
      name: "show_stages",
      description: "Permissão de Ver Estágios",
      updatedAt: date, createdAt: date
    },
    {
      name: "modify_stages",
      description: "Permissão de Criar e Editar Estágios",
      updatedAt: date, createdAt: date
    },
    {
      name: "delete_stages",
      description: "Permissão de Deletar Estágios",
      updatedAt: date, createdAt: date
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('permissions', null, {})
  }
};
