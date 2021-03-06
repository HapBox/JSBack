const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  host: "localhost",
  dialect: "postgres",
  database: "todojs",
  username: "postgres",
  password: "Nikita1337",
});

async function initDB() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    // await sequelize.dropSchema("public",{});
    // await sequelize.createSchema("public",{});
    await sequelize.sync();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

module.exports = {
  initDB,
  sequelize,
};