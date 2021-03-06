export default (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    phone: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    isStarred: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {});
  Contact.associate = (models) => {
    Contact.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return Contact;
};
