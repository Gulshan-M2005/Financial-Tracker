const express = require("express");
const router = express.Router();
const Income = require("../models/Income");
const Expense = require("../models/Expense");

// GET /api/dashboard/summary?userId=123
router.get("/summary", async (req, res) => {
  try {
    const userId = req.query.userId;              // or from auth middleware

    const incomes = await Income.find({ userId });
    const expenses = await Expense.find({ userId });

    const totalIncome = incomes.reduce((s, i) => s + i.amount, 0);
    const totalExpense = expenses.reduce((s, e) => s + e.amount, 0);

    const budgetUsed = totalExpense;              // simple logic
    const savingsGoalProgressPercent = 72;        // placeholder

    const transactions = [
      ...incomes.map(i => ({
        id: i._id,
        name: i.description || i.category || "Income",
        amount: i.amount,
        type: "income",
        date: i.date,
      })),
      ...expenses.map(e => ({
        id: e._id,
        name: e.description || e.category || "Expense",
        amount: e.amount,
        type: "expense",
        date: e.date,
      })),
    ]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    res.json({
      summary: { totalIncome, totalExpense, budgetUsed, savingsGoalProgressPercent },
      transactions,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to load dashboard" });
  }
});

module.exports = router;
