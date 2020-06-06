module.exports = (sequelize, DataTypes) => {
  const Vaccine = sequelize.define(
    'Vaccine',
    {
      id: {
        field: 'ID_VACINA',
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      serialNumber: {
        field: 'NUM_SERIE',
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      label: {
        field: 'DESCRICAO',
        type: DataTypes.STRING,
        allowNull: false,
      },
      defaultQuantity: {
        field: 'QTD_PADRAO',
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      active: {
        field: 'ATIVO',
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      tableName: 'VACINA',
    }
  );
  return Vaccine;
};
