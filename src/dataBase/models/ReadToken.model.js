const { sequelize } = require("..");
const { Sequelize } = require("sequelize");

class ReadToken extends Sequelize.Model {}

ReadToken.init(
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
  { sequelize: sequelize, modelName: "readtoken" }
);

module.exports = ReadToken;