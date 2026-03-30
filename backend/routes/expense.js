const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

// create expense
router.post("/", async (req, res) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.status(201).json(expense);
  } catch {
    res.status(500).json({ error: "Failed to create expense" });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.params.userId });
    res.json(expenses);
  } catch {
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
});

module.exports = router;
