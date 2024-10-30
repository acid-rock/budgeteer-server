const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/createUser", async (req, res) => {
  const { id, username, timezone } = req.body;

  try {
    const user = await User.findOrCreate({
      where: {
        id: id,
        username: username,
        timezone: timezone,
      },
    });

    if (created) {
      return res.status(201);
    }
  } catch (error) {
    console.error("Error creating user - ", error);
    return res.sendStatus(500);
  }
});

router.get("/fetchUser", async (req, res) => {
  const user_id = req.query.user_id;
  try {
    const user = await User.findAll({ where: { id: user_id } });

    if (!user) {
      return res.sendStatus(404);
    }

    return res.json(user);
  } catch (error) {
    console.error("Error fetching user - ", error);
    return res.sendStatus(500);
  }
});

module.exports = router;
