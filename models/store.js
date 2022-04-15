"use strict";
const { hash } = require("../helpers/bcrypt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Store.belongsToMany(models.Customer, { through: models.Transaction });
    }
  }
  Store.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: { msg: "Store email must be unique" },
        allowNull: false,
        validate: {
          notNull: { msg: "Store email cannot be null" },
          notEmpty: { msg: "Store email cannot be empty" },
          isEmail: { msg: "Store email must be email format" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Store password cannot be null" },
          notEmpty: { msg: "Store password cannot be empty" },
          len: {
            args: [5],
            msg: "Store password length minimum 5 letters",
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Store name cannot be null" },
          notEmpty: { msg: "Store name cannot be empty" },
        },
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Store location cannot be null" },
          notEmpty: { msg: "Store location cannot be empty" },
        },
      },
    },
    {
      hooks: {
        beforeCreate: (store) => {
          store.password = hash(store.password);
        },
      },
      sequelize,
      modelName: "Store",
    }
  );
  return Store;
};
