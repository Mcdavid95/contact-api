export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    passwordToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    expiryTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
  }, {});

  User.associate = (models) => {
    User.hasMany(models.Contact, {
      foreignKey: 'userId',
      as: 'userContacts',
    });
  };
  return User;
};
