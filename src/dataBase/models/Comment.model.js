const { sequelize } = require("..");
const { Sequelize } = require("sequelize");

class Comment extends Sequelize.Model {}

Comment.init(
  {
    id: {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.DataTypes.UUIDV4,
      primaryKey: true,
    },
    text: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM('ACTIVE', 'DONE'),
      defaultValue: 'ACTIVE',
    },
  },
  { sequelize: sequelize, modelName: "comment" }
);

module.exports = Comment;
