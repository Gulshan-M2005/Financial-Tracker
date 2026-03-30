const mongoose = require("mongoose");

const IncomeSchema = new mongoose.Schema({
  category: String,
  value: Number,
  account: String,
  date: String,
  time: String,
  from: String,
  notes: String,
});

module.exports = mongoose.model("Income", IncomeSchema);
