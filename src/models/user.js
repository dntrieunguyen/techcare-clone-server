'use strict';
const { Model } = require('sequelize');
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
   User.init(
      {
         name: DataTypes.STRING,
         password: DataTypes.STRING,
         email: DataTypes.STRING,
         phone: DataTypes.STRING,
         refreshToken: DataTypes.STRING,
         avatar: DataTypes.STRING,
         role: DataTypes.ENUM,
         cartId: DataTypes.STRING,
         ShoppingHistoryId: DataTypes.STRING,
         isBlocked: DataTypes.BOOLEAN,
      },
      {
         sequelize,
         modelName: 'Users',
      },
   );
   return User;
};
