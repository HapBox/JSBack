const { sequelize } = require("..");
const { Sequelize } = require("sequelize");
const Token = require('./Token.model');

class User extends Sequelize.Model {}

User.init(
  {
    id: {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.DataTypes.UUIDV4,
      primaryKey: true,
    },
    login: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
  },
  { sequelize: sequelize, modelName: "user" }
);

User.hasMany(Token, {
    as: "Token",
    foreignKey: "userID",
  });

module.exports = User;
