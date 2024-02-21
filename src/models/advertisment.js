'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
   class Advertisment extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
      }
      // Hash password before saving to database

      // }
   }
   Advertisment.init(
      {
         id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
         },
         ad_type: DataTypes.ENUM('carousel', 'banner', 'modal'),
         image_url: DataTypes.STRING,
      },
      {
         sequelize,
         modelName: 'Advertisment',
      },
   );

   return Advertisment;
};
