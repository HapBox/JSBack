const { sequelize } = require("..");
const { Sequelize } = require("sequelize");

class ToDo extends Sequelize.Model {}

ToDo.init(
  {
    id: {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      defaultValue: "Title",
    },
    description: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    isDone: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    isFavourite: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    priority: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
  },
  { sequelize: sequelize, modelName: "todo" }
);

module.exports = ToDo;
