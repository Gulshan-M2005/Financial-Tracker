const express = require("express");
const router = express.Router();
const Income = require("../models/Income");

// create income
router.post("/", async (req, res) => {
  try {
    const income = new Income(req.body);
    await income.save();
    res.status(201).json(income);
  } catch (err) {
    res.status(500).json({ error: "Failed to create income" });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const incomes = await Income.find({ userId: req.params.userId });
    res.json(incomes);
  } catch {
    res.status(500).json({ error: "Failed to fetch incomes" });
  }
});

module.exports = router;
