module.exports = (sequelize, DataTypes) => {
  const VaccinationRecord = sequelize.define(
    'VaccinationRecord',
    {
      id: {
        field: 'ID_REGISTRO_VACINACAO',
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      vaccineId: {
        field: 'ID_VACINA',
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      patientId: {
        field: 'ID_USUARIO_PACIENTE',
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      providerId: {
        field: 'ID_USUARIO_COLABORADOR',
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      comments: {
        field: 'OBSERVACAO',
        type: DataTypes.STRING,
        allowNull: true,
      },
      quantity: {
        field: 'QUANTIDADE',
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATEONLY,
      },
    },
    {
      tableName: 'REGISTRO_VACINA',
    }
  );
  VaccinationRecord.associate = (models) => {
    VaccinationRecord.belongsTo(models.Vaccine, { foreignKey: 'vaccineId' });
    VaccinationRecord.belongsTo(models.User, { foreignKey: 'patientId' });
    VaccinationRecord.belongsTo(models.User, { foreignKey: 'providerId' });
  };
  return VaccinationRecord;
};
