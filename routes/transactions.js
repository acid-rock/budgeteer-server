const express = require("express");
const router = express.Router();
const Transaction = require("../models/transaction");
const { DateTime } = require("luxon");
const {
  getUTCDayRange,
  getUTCWeekRange,
  getUTCMonthRange,
  getUTCYearRange,
} = require("../lib/dateUtils");
const { Op } = require("sequelize");

router
  // Create
  .post("/create", async (req, res) => {
    const { username, user_id, type, amount, category, date, description } =
      req.body;

    // Make the entry
    try {
      const transaction = await Transaction.create({
        username: username,
        user_id: user_id,
        type: type,
        amount: amount,
        category: category,
        date: date,
        description: description,
      });

      if (!transaction) return res.sendStatus(500);

      return res.status(201).json(transaction);
    } catch (error) {
      console.error("Error creating - ", error);
      return res.sendStatus(500);
    }
  })
  // Update
  .post("/update/:id", async (req, res) => {
    const id = req.params.id;
    const { type, amount, category, date, description } = req.body;

    // Update the entry
    try {
      const newTransaction = await Transaction.update(
        {
          type: type,
          amount: amount,
          category: category,
          date: date,
          description: description,
        },
        { where: { id: id } }
      );

      if (!newTransaction)
        return res
          .status(500)
          .json({ message: "Error editing entry. Try again later." });

      return res.sendStatus(200);
    } catch (error) {
      console.error("Error creating - ", error);
      return res.sendStatus(500);
    }
  });

// Fetch
router
  .get("/fetch", async (req, res) => {
    const user_id = req.query.user_id;

    try {
      const transactions = await Transaction.findAll({
        where: { user_id: user_id },
      });

      return res.json(transactions);
    } catch (error) {
      console.error("Error creating - ", error);
      return res.sendStatus(500);
    }
  })
  // Fetch transaction by ID.
  .get("/fetch/:id", async (req, res) => {
    const id = req.params.id;

    try {
      const transaction = await Transaction.findByPk(id);

      // Convert to proper format with timezone
      const data = transaction.dataValues;
      const tz = "Asia/Manila"; // To be edited when user account is in place
      const date = data.date;

      const formattedDate = DateTime.fromJSDate(date)
        .setZone(tz)
        .toFormat("yyyy-MM-dd'T'HH:mm:ss");

      transaction.dataValues.date = formattedDate;

      // Return the data
      return res.json(transaction);
    } catch (error) {
      console.error("Error creating - ", error);
      return res.sendStatus(500);
    }
  })
  .get("/fetchRecent", async (req, res) => {
    const user_id = req.query.user_id;

    try {
      const recent = await Transaction.findAll({
        where: { user_id: user_id },
        limit: 5,
        order: [["date", "DESC"]],
      });

      if (!recent) {
        return res.sendStatus(500);
      }

      return res.status(200).json(recent);
    } catch (error) {
      console.error("Error creating - ", error);
      return res.sendStatus(500);
    }
  })
  // Fetch current day transactions
  .get("/fetchCurrent", async (req, res) => {
    const { user_id, timezone } = req.query;

    const { start, end } = getUTCDayRange(timezone);

    try {
      const transactions = await Transaction.findAll(
        {
          where: { user_id: user_id, date: { [Op.between]: [start, end] } },
        },
        { order: [["date", "DESC"]] }
      );

      if (!transactions) {
        return res.status(404).json({});
      }

      return res.json(transactions);
    } catch (error) {
      console.error("Error fetching data - ", error);
    }
  })
  // Fetch weekly transactions
  .get("/fetchWeekly", async (req, res) => {
    const { user_id, timezone } = req.query;

    const { start, end } = getUTCWeekRange(timezone);

    try {
      const transactions = await Transaction.findAll(
        {
          where: { user_id: user_id, date: { [Op.between]: [start, end] } },
        },
        { order: [["date", "DESC"]] }
      );

      if (!transactions) {
        return res.status(404).json({});
      }

      return res.json(transactions);
    } catch (error) {
      console.error("Error fetching data - ", error);
    }
  })
  // Fetch monthly transactions
  .get("/fetchMonthly", async (req, res) => {
    const { user_id, timezone } = req.query;

    const { start, end } = getUTCMonthRange(timezone);

    try {
      const transactions = await Transaction.findAll(
        {
          where: { user_id: user_id, date: { [Op.between]: [start, end] } },
        },
        { order: [["date", "DESC"]] }
      );

      if (!transactions) {
        return res.status(404).json({});
      }

      return res.json(transactions);
    } catch (error) {
      console.error("Error fetching data - ", error);
    }
  })
  // Fetch yearly transactions
  .get("/fetchYearly", async (req, res) => {
    const { user_id, timezone } = req.query;

    const { start, end } = getUTCYearRange(timezone);

    try {
      const transactions = await Transaction.findAll(
        {
          where: { user_id: user_id, date: { [Op.between]: [start, end] } },
        },
        { order: [["date", "DESC"]] }
      );

      if (!transactions) {
        return res.status(404).json({});
      }

      return res.json(transactions);
    } catch (error) {
      console.error("Error fetching data - ", error);
    }
  });

// Delete
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await Transaction.destroy({ where: { id: id } });

    return res.sendStatus(200);
  } catch (error) {
    console.error("Error creating - ", error);
    return res.sendStatus(500);
  }
});

module.exports = router;
