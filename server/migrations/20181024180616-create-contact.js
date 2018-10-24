module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Contacts', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: []
    },
    phone: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: []
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    contactId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'contactId',
      },
    },
  }),
  down: queryInterface => queryInterface.dropTable('Contacts')
};
