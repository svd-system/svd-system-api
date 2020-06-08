module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('REGISTRO_VACINA', {
      id: {
        field: 'ID_REGISTRO_VACINACAO',
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      vaccineId: {
        field: 'ID_VACINA',
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'VACINA',
          key: 'ID_VACINA',
        },
      },
      patientId: {
        field: 'ID_USUARIO_PACIENTE',
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'USUARIO',
          key: 'ID_USUARIO',
        },
      },
      providerId: {
        field: 'ID_USUARIO_COLABORADOR',
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'USUARIO',
          key: 'ID_USUARIO',
        },
      },
      comments: {
        field: 'OBSERVACAO',
        type: Sequelize.STRING,
        allowNull: true,
      },
      quantity: {
        field: 'QUANTIDADE',
        type: Sequelize.INTEGER,
        allowNull: false,
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
    return queryInterface.dropTable('REGISTRO_VACINA');
  },
};
