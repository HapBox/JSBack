const { sequelize } = require("..");
const { Sequelize } = require("sequelize");
const Token = require("./Token.model");
const ToDo = require("./ToDo.model");
const ReadToken = require("./ReadToken.model");
const Comment = require("./Comment.model");
const MailToken = require("./MailToken.model");

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
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
  },
  { sequelize: sequelize, modelName: "user" }
);

User.hasMany(Token);

Token.belongsTo(User, {
  foreignKey: "userId",
});

User.hasMany(ToDo);

ToDo.belongsTo(User, {
  foreignKey: "userId",
});

ToDo.hasMany(ReadToken);

ReadToken.belongsTo(ToDo, {
  foreignKey: "todoId",
});

ToDo.hasMany(Comment);

Comment.belongsTo(ToDo, {
  foreignKey: "todoId",
});

User.hasMany(MailToken);

MailToken.belongsTo(User, {
  foreignKey: "userId",
});

module.exports = User;
