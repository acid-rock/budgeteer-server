const { Sequelize } = require("sequelize");

module.exports = new Sequelize("database", "username", "password", {
  logging: false,
  host: "localhost",
  dialect: "sqlite",
  storage: "database.sqlite",
});
