'use strict';
const {
  Model
} = require('sequelize');
const {encode} = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Player)
    }
  };
  User.init({
    username: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg: 'Email is required'
        },
        notNull:{
          msg: 'Email is required'
        },
        isEmail:{
          msg: 'Invalid email format'
        }
      }
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:{
        msg:'Email must be unique'
      },
      validate:{
        notEmpty:{
          msg: 'Email is required'
        },
        notNull:{
          msg: 'Email is required'
        },
        isEmail:{
          msg: 'Invalid email format'
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg: 'Password is required'
        },
        notNull:{
          msg: 'Password is required'
        }
      }
    }
  }, {
    sequelize,
    hooks:{
      beforeCreate: (user,options)=>{
        user.password = encode(user.password)
      }
    },
    modelName: 'User',
  });
  return User;
};