const { sequelize } = require("..");
const { Sequelize } = require("sequelize");
const User = require("./User.model");

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
    },
  },
  { sequelize: sequelize, modelName: "todo" }
);

ToDo.belongsTo(User, {
  as: "User",
  foreignKey: "UserID",
});

module.exports = ToDo;
