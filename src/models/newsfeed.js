module.exports = (sequelize, DataTypes) => {
  const Newsfeed = sequelize.define(
    'Newsfeed',
    {
      id: {
        field: 'ID',
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
        type: DataTypes.STRING,
      },
      link: {
        field: 'LINK',
        type: DataTypes.STRING,
      },
      date: {
        fild: 'DATA',
        type: DataTypes.DATEONLY,
      },
      icon: {
        field: 'ICONE',
        type: DataTypes.BOOLEAN,
        defaultValue: null,
      },
    },
    {
      tableName: 'MURAL',
    }
  );
  return Newsfeed;
};