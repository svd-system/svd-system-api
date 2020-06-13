module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('USUARIO', 'SEXO', {
      name: 'genre',
      type: Sequelize.ENUM({
        values: ['FEMININO', 'MASCULINO'],
      }),
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('USUARIO', 'SEXO');
  },
};
