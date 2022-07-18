'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('activityUsers', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true
      },
      activityId: {
        type: Sequelize.INTEGER,
        references: { model: 'activities', key: 'id' },
        onDelete: 'cascade',
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onDelete: 'cascade',
        primaryKey: true,
        allowNull: false,
      },
      postId: {
        type: Sequelize.INTEGER,
        references: { model: 'posts', key: 'id' },
        onDelete: 'cascade',
      },
      activityFeedbackId: {
        type: Sequelize.INTEGER,
        references: { model: 'activityFeedbacks', key: 'id' },
        onDelete: 'cascade',
      },
      activitySubmissionId: {
        type: Sequelize.INTEGER,
        references: { model: 'activitySubmissions', key: 'id' },
        onDelete: 'cascade',
      },
      dateStarted: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.DataTypes.NOW,
      },
      dateCompleted: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('activityUsers');
  }
};