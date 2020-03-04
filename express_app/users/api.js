const express = require("express");
const { User } = require("./models");

var router = express.Router();

// await/async doesnt work with error middleware, probably have to go back to promises, or write way too much try-catch

router.get("/", async (req, res) => {
  try {
    const users = await User.find({}).lean();
    return res.json(users);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.get("/:id/", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).lean();
    if (!user) {
      return res.status(404).send("User not found");
    }
    return res.status(200).json(user);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.validate();
    await user.save();
    return res.status(200).json(user);
  } catch (e) {
    return res.status(500).send(e);
  }
});

router.delete("/:id/", async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id });
    if (!user) {
      return res.status(404).send("User not found");
    }
    return res.status(200).json(user);
  } catch (e) {
    return res.status(500).send(e);
  }
});

module.exports = router;
