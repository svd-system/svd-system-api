module.exports = (sequelize, DataTypes) => {
  const Newsfeed = sequelize.define(
    'Newsfeed',
    {
      id: {
        field: 'ID_POST',
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        field: 'TITULO',
        allowNull: false,
        type: DataTypes.STRING,
      },
      description: {
        field: 'DESCRICAO',
        allowNull: false,
        type: DataTypes.STRING,
      },
      link: {
        field: 'LINK',
        type: DataTypes.STRING,
      },
      expiresAt: {
        fild: 'DT_EXPIRACAO',
        type: DataTypes.DATEONLY,
      },
      showIcon: {
        field: 'EXIBIR_ICONE',
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: 'MURAL',
    }
  );
  return Newsfeed;
};
