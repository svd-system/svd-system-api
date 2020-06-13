module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('USUARIO', 'NUM_LOGRADOURO', {
      name: 'houseNumber',
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('USUARIO', 'NUM_LOGRADOURO');
  },
};
