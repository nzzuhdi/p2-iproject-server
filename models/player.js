'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Player.belongsTo(models.User)
      Player.belongsTo(models.Event)
    }
  };
  Player.init({
    UserId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notEmpty:{
          msg: 'UserId is required'
        },
        notNull:{
          msg: 'UserId is required'
        }
      }
    },
    EventId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notEmpty:{
          msg: 'EventId is required'
        },
        notNull:{
          msg: 'EventId is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};