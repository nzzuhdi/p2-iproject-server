'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.hasMany(models.Player)
    }
  };
  Event.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg: 'Name is required'
        },
        notNull:{
          msg: 'Name is required'
        }
      }
    },
    category: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg: 'Category is required'
        },
        notNull:{
          msg: 'Category is required'
        }
      }
    },
    address: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg: 'Address is required'
        },
        notNull:{
          msg: 'Address is required'
        }
      }
    },
    imageUrl: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg: 'Image is required'
        },
        notNull:{
          msg: 'Image is required'
        },
        isUrl:{
          msg: 'Image must in url Format'
        }
      }
    },
    lattitude: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg: 'Lattitude is required'
        },
        notNull:{
          msg: 'Lattitude is required'
        }
      }
    },
    longitude: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg: 'Longitude is required'
        },
        notNull:{
          msg: 'Longitude is required'
        }
      }
    },
    date: {
      type:DataTypes.DATE,
      allowNull:false,
      validate:{
        notEmpty:{
          msg: 'Date is required'
        },
        notNull:{
          msg: 'Date is required'
        }
      }
    },
    time: {
      type:DataTypes.TIME,
      allowNull:false,
      validate:{
        notEmpty:{
          msg: 'Time is required'
        },
        notNull:{
          msg: 'Time is required'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};