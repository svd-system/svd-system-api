module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('USUARIO', {
      id: {
        field: 'ID_USUARIO',
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cpf: {
        field: 'CPF',
        type: Sequelize.STRING(11),
        allowNull: false,
        unique: true,
      },
      firstName: {
        field: 'NOME',
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        field: 'SOBRENOME',
        type: Sequelize.STRING,
        allowNull: false,
      },
      birthDate: {
        field: 'DT_NASCIMENTO',
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      email: {
        field: 'EMAIL',
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      phoneNumber: {
        field: 'TELEFONE',
        type: Sequelize.STRING,
        allowNull: true,
      },
      cep: {
        field: 'CEP',
        type: Sequelize.STRING(8),
        allowNull: true,
      },
      city: {
        field: 'MUNICIPIO',
        type: Sequelize.STRING,
        allowNull: false,
      },
      state: {
        field: 'UF',
        type: Sequelize.STRING(2),
        allowNull: false,
      },
      professionalOccupation: {
        field: 'PROFISSAO',
        type: Sequelize.STRING,
        allowNull: true,
      },
      role: {
        field: 'TP_USUARIO',
        type: Sequelize.ENUM({
          values: ['PACIENTE', 'COLABORADOR', 'ADMINISTRADOR'],
        }),
        defaultValue: 'PACIENTE',
        allowNull: false,
      },
      password: {
        field: 'SENHA',
        type: Sequelize.STRING,
        allowNull: false,
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
    return queryInterface.dropTable('USUARIO');
  },
};
