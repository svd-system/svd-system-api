module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        field: 'ID_USUARIO',
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      cpf: {
        field: 'CPF',
        type: DataTypes.STRING(11),
        allowNull: false,
        unique: true,
      },
      firstName: {
        field: 'NOME',
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        field: 'SOBRENOME',
        type: DataTypes.STRING,
        allowNull: false,
      },
      birthDate: {
        field: 'DT_NASCIMENTO',
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      email: {
        field: 'EMAIL',
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      phoneNumber: {
        field: 'TELEFONE',
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        field: 'LOGRADOURO',
        type: DataTypes.STRING,
        allowNull: true,
      },
      houseNumber: {
        field: 'NUM_LOGRADOURO',
        type: DataTypes.STRING,
        allowNull: true,
      },
      cep: {
        field: 'CEP',
        type: DataTypes.STRING(8),
        allowNull: true,
      },
      city: {
        field: 'MUNICIPIO',
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        field: 'UF',
        type: DataTypes.STRING(2),
        allowNull: false,
      },
      professionalOccupation: {
        field: 'PROFISSAO',
        type: DataTypes.STRING,
        allowNull: true,
      },
      role: {
        field: 'TP_USUARIO',
        type: DataTypes.ENUM({
          values: ['PACIENTE', 'COLABORADOR', 'ADMINISTRADOR'],
        }),
        defaultValue: 'PACIENTE',
        allowNull: false,
      },
      password: {
        field: 'SENHA',
        type: DataTypes.STRING,
        allowNull: false,
      },
      active: {
        field: 'ATIVO',
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      tableName: 'USUARIO',
      instanceMethods: {
        toJSON() {
          const values = { ...this.get() };
          delete values.password;
          return values;
        },
      },
    }
  );
  return User;
};
