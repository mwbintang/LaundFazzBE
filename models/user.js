'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:{msg:"Email has been used"},
      validation:{
        notNull:{msg:"Email is required"},
        notEmpty:{msg:"Email is required"},
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validation:{
        notNull:{msg:"Password is required"},
        notEmpty:{msg:"Password is required"},
        len:{
          args: [5],
          msg: 'Minimum 5 digit'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};