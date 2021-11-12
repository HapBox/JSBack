const { sequelize } = require("..");
const { Sequelize } = require("sequelize");

class MailToken extends Sequelize.Model {}

MailToken.init(
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
  { sequelize: sequelize, modelName: "mailtoken" }
);

module.exports = MailToken;