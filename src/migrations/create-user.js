'use strict';

const { ROLE } = require('../utils/constants');
const { v4 } = require('uuid');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable('Users', {
         id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            unique: true,
            defaultValue: v4(),
         },
         username: {
            type: Sequelize.STRING,
            unique: true,
         },
         password: {
            type: Sequelize.STRING,
         },
         email: {
            type: Sequelize.STRING,
         },
         phone: {
            type: Sequelize.STRING,
            unique: true,
         },
         refreshToken: {
            type: Sequelize.STRING,
         },
         avatar: {
            type: Sequelize.STRING,
         },
         role: {
            type: Sequelize.ENUM(ROLE.ADMIN, ROLE.CUSTOMER, ROLE.SUPPORTER),
            defaultValue: ROLE.CUSTOMER,
         },
         cartId: {
            type: Sequelize.STRING,
         },
         ShoppingHistoryId: {
            type: Sequelize.STRING,
         },
         isBlocked: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
         },
         createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
         },
         updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
         },
      });
   },
   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable('Users');
   },
};
