'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
   class Ads extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
         Ads.hasMany(models.Carousel, { foreignKey: 'carouselId', as: 'ads' });
      }
      // Hash password before saving to database

      // }
   }
   Ads.init(
      {
         id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
         },
         carouselId: DataTypes.STRING,
         banners: DataTypes.TEXT,
      },
      {
         sequelize,
         modelName: 'Ads',
      },
   );

   return Ads;
};
