const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    host: 'localhost',
    dialect: 'postgres',
    database: 'todojs',
    username: 'postgres',
    password: 'Nikita1337',
    models: [__dirname + '/models/*.model.*'],
  });

async function initDB(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = {
    initDB,
    sequelize
};