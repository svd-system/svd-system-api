module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MURAL', {
      id: {
        field: 'ID',
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        field: 'TITULO',
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        field: 'DESCRICAO',
        type: Sequelize.STRING,
      },
      link: {
        field: 'LINK',
        type: Sequelize.STRING,
      },
      date: {
        fild: 'DATA',
        type: Sequelize.DATEONLY,
      },
      icon: {
        field: 'ICONE',
        type: Sequelize.BOOLEAN,
        defaultValue: null,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('MURAL');
  }
};