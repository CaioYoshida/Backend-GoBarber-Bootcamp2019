module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'avatar_id', {
      type: Sequelize.INTEGER,
      references: { model: 'files', key: 'id' },
      onUpdate: 'CASCADE',
      unDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: queryInterface => {
    // removeColumn([table], [column's table]) that you want to remove
    return queryInterface.removeColumn('users', 'avatar_id');
  },
};
