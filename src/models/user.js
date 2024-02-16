'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

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
      // Hash password before saving to database
      static async hashPassword(user, options, next) {
         if (!user.changed('password')) {
            next();
         }

         const saltRounds = 10;
         const salt = await bcrypt.genSaltSync(saltRounds);
         const hashPassword = await bcrypt.hashSync(user.password, salt);
         user.password = hashPassword;
      }
      // Check if password is correct
      async isCorrectPassword(password) {
         return await bcrypt.compareSync(password, this.password);
      }
   }
   User.init(
      {
         username: DataTypes.STRING,
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
         hooks: {
            beforeSave: User.hashPassword,
         },
      },
   );
   return User;
};
