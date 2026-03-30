const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  category: String,
  value: Number,
  account: String,
  date: String,
  time: String,
  to: String,
  notes: String,
});

module.exports = mongoose.model("Expense", ExpenseSchema);
