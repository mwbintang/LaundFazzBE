"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Customer);
      Transaction.belongsTo(models.Store);
    }
  }
  Transaction.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      CustomerId: DataTypes.INTEGER,
      StoreId: DataTypes.INTEGER,
      isPaid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "Pending",
      },
      pickupDate: DataTypes.DATE,
      deliveryDate: DataTypes.DATE,
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Transaction location cannot be null" },
          notEmpty: { msg: "Transaction location cannot be empty" },
        },
      },
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
