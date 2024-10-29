const sequelize = require("../database/config");
const { DataTypes } = require("sequelize");
const { DateTime } = require("luxon");

const Transaction = sequelize.define("Transaction", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  description: DataTypes.STRING,
});

module.exports = Transaction;
