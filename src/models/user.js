'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
const { ROLE } = require('../utils/constants');
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
      static async hashPassword(user, options) {
         if (user.changed('password')) {
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashPassword = await bcrypt.hash(user.password, salt);
            user.password = hashPassword;
         }
      }
      // Check if password is correct
      async isCorrectPassword(password) {
         return await bcrypt.compare(password, this.password);
      }

      // static async createPK(user, options) {
      //    user.id = v4();
      // }
   }
   User.init(
      {
         id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            unique: true,
            defaultValue: DataTypes.UUIDV4,
         },
         username: DataTypes.STRING,
         password: DataTypes.STRING,
         email: DataTypes.STRING,
         phone: DataTypes.STRING,
         refreshToken: DataTypes.STRING,
         avatar: DataTypes.STRING,
         role: DataTypes.ENUM(ROLE.ADMIN, ROLE.CUSTOMER, ROLE.SUPPORTER),
         cartId: DataTypes.STRING,
         ShoppingHistoryId: DataTypes.STRING,
         isBlocked: DataTypes.BOOLEAN,
      },
      {
         sequelize,
         modelName: 'User',
         hooks: {
            beforeSave: User.hashPassword,
         },
      },
   );
   return User;
};
