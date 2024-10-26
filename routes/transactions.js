const express = require("express");
const router = express.Router();
const Transaction = require("../models/transaction");
const { DateTime } = require("luxon");

router
  // Create
  .post("/create", async (req, res) => {
    const { type, amount, category, date, description } = req.body;

    // Make the entry
    try {
      const transaction = await Transaction.create({
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
    try {
      const transactions = await Transaction.findAll();

      return res.json(transactions);
    } catch (error) {
      console.error("Error creating - ", error);
      return res.sendStatus(500);
    }
  })
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

      return res.sendStatus(200);
    } catch (error) {
      console.error("Error creating - ", error);
      return res.sendStatus(500);
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
