'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
   class Carousel extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         Carousel.belongsTo(models.Ads);
      }
      // Hash password before saving to database

      // }
   }
   Carousel.init(
      {
         id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
         },
         img_url: DataTypes.STRING,
      },
      {
         sequelize,
         modelName: 'Carousel',
      },
   );
   return Carousel;
};
