import React from "react";

const TransactionButtons = ({ openIncome, openExpense }) => (
  <div className="fab-group">
    <button className="fab plus" onClick={openIncome}>+</button>
    <button className="fab minus" onClick={openExpense}>–</button>
  </div>
);

export default TransactionButtons;
