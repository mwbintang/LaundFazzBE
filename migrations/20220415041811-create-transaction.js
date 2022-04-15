'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      CustomerId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Customers",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      StoreId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Stores",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      isPaid: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "Pending"
      },
      pickupDate: {
        type: Sequelize.DATE,
        // isDate: true
      },
      deliveryDate: {
        type: Sequelize.DATE,
        // isDate: true
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transactions');
  }
};