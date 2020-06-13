module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('VACINA', {
      id: {
        field: 'ID_VACINA',
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      serialNumber: {
        field: 'NUM_SERIE',
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      label: {
        field: 'DESCRICAO',
        type: Sequelize.STRING,
        allowNull: false,
      },
      defaultQuantity: {
        field: 'QTD_PADRAO',
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      active: {
        field: 'ATIVO',
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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
    return queryInterface.dropTable('VACINA');
  },
};
