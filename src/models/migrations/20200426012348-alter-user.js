module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('USUARIO', 'LOGRADOURO', {
      name: 'address',
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('USUARIO', 'LOGRADOURO');
  },
};
