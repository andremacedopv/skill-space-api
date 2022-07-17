'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let d = new Date(); 
    let date = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()

    const models = [
      {name: "stages", text: "Estágios"}, 
      {name: "activities", text: "Atividades"}, 
      {name: "events", text: "Eventos"},
      {name: "category", text: "Categorias"},
      {name: "invitedSpeaker", text: "Apresentadores Convidados"},
      {name: "tag", text: "Tags"}
    ]
    const permission_types = [
      {name: "crud", text: "Permissão de Ver, Criar, Editar e Deletar"},
      {name: "show", text: "Permissão de Ver"},
      {name: "modify", text: "Permissão de Criar e Editar"},
      {name: "delete", text: "Permissão de Deletar"},
    ]
    
    const permissions = []
    
    models.forEach(model => {
      permission_types.forEach(permission_type => {
        permissions.push({
          name: permission_type.name + "_" + model.name,
          description: permission_type.text + " " + model.text,
          createdAt: date, updatedAt: date
        })
      })
    })

    await queryInterface.bulkInsert('permissions', permissions)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('permissions', null, {})
  }
};
