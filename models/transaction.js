const sequelize = require("../database/config");
const { DataTypes } = require("sequelize");
const { DateTime } = require("luxon");

const Transaction = sequelize.define(
  "Transaction",
  {
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
  },
  {
    hooks: {
      beforeCreate: (transaction) => {
        // Convert dates to UTC for consistency
        transaction.date = DateTime.fromJSDate(transaction.date)
          .toUTC()
          .toFormat("yyyy-MM-dd'T'HH:mm:ss");
      },
    },
  }
);

module.exports = Transaction;
