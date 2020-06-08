module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MURAL', {
      id: {
        field: 'ID_POST',
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
        allowNull: false,
        type: Sequelize.STRING,
      },
      link: {
        field: 'LINK',
        type: Sequelize.STRING,
      },
      expiresAt: {
        fild: 'DT_EXPIRACAO',
        type: Sequelize.DATEONLY,
      },
      showIcon: {
        field: 'EXIBIR_ICONE',
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('MURAL');
  },
};
