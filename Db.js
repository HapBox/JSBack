const { Sequelize } = require('sequelize');  //Подключение БД
const sequelize = new Sequelize('postgres://postgres:Nikita1337@localhost/todojs');

let db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;