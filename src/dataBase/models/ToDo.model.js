const {sequelize} = require('..');
const { Model, DataTypes } = require('sequelize');

class ToDo extends Sequelize.Model {}
ToDo.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING
        }
    }
)

module.exports = ToDo;