'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('postTags', { 
      postId: {
        type: Sequelize.INTEGER,
        references: { model: 'posts', key: 'id' },
        onDelete: 'CASCADE',
        primaryKey: true
      },
      tagId: {
        type: Sequelize.INTEGER,
        references: { model: 'tags', key: 'id' },
        onDelete: 'CASCADE',
        primaryKey: true
      },
      updatedAt: Sequelize.DATE,
      createdAt: Sequelize.DATE
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('postTags');
  }
};
