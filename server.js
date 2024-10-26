const express = require("express");
const app = express();
const sequelize = require("./database/config");
const cors = require("cors");
const transactionRoutes = require("./routes/transactions");

const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/transactions", transactionRoutes);

// Database
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established.");

    await sequelize.sync();
    console.log("Models synced successfully.");
  } catch (error) {
    console.error("Database error occurred.", error);
  }
})();

app.listen(PORT, (error) => {
  if (error) console.error("Error at - ", error);

  console.clear();
  console.log(`Started server at ${PORT}.`);
});
