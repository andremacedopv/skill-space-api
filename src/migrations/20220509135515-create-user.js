'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: {
          type: Sequelize.STRING,
          allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ddd: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false
      },
      addressId: {
        type: Sequelize.INTEGER,
        references: { model: 'addresses', key: 'id' },
        onDelete: 'SET NULL',
      },
      birthdate: {
          type: Sequelize.DATE,
          allowNull: false
      },
      admin: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
      },
      owner: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      updatedAt: Sequelize.DATE,
      createdAt: Sequelize.DATE
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
