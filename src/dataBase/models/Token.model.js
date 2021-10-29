const { sequelize } = require("..");
const { Sequelize } = require("sequelize");
const User = require("./User.model");

class Token extends Sequelize.Model {}

Token.init(
  {
    id: {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.DataTypes.UUIDV4,
      primaryKey: true,
    },
    value: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { sequelize: sequelize, modelName: "token" }
);

module.exports = Token;
