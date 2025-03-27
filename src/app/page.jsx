"use client";

import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AddTransaction from "./Components/AddTransaction";
import TransactionList from "./Components/TransactionList";

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [balance, setBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [date, setDate] = useState(new Date().toLocaleDateString());

  const addExpense = () => {
    if (!description.trim() || !amount.trim()) return;
    const newExpense = {
      id: expenses.length + 1,
      description,
      amount: parseFloat(amount),
      type,
      date,
    };
    setExpenses([...expenses, newExpense]);
    setBalance(
      type === "expense"
        ? balance - parseFloat(amount)
        : balance + parseFloat(amount)
    );

    if (type === "expense") {
      setTotalExpense(totalExpense + parseFloat(amount));
    } else {
      setTotalIncome(totalIncome + parseFloat(amount));
    }
    setDescription("");
    setAmount("");
    setDate(new Date().toLocaleDateString());
  };
  const removeExpense = (id) => {
    const expenseToRemove = expenses.find((expenses) => expenses.id === id);
    if (expenseToRemove) {
      setExpenses(expenses.filter((expense) => expense.id !== id));
      setBalance(
        expenseToRemove.type === "expense"
          ? balance + expenseToRemove.amount
          : balance - expenseToRemove.amount
      );
      if (expenseToRemove.type === "expense") {
        setTotalExpense(totalExpense - expenseToRemove.amount);
      } else {
        setTotalIncome(totalIncome - expenseToRemove.amount);
      }
    }
  }
  return(
    <div className="container bg-light mt-5 p-5 border border-dark rounded-3xl col-md-8">
      <h1 className="text-center text-success">Exense Tracker</h1>
      <AddTransaction 
      description = {description}
      setDescription = {setDescription}
      amount = {amount}
      setAmount = {setAmount}
      date = {date}
      setDate = {setDate}
      type = {type}
      setType = {setType}
      balance = {balance}
      setBalance = {setBalance}
      totalIncome = {totalIncome}
      setTotalIncome = {setTotalIncome}
      totalExpense = {totalExpense}
      setTotalExpense = {setTotalExpense}
      addExpense = {addExpense}/>
      <TransactionList
      expenses = {expenses}
      removeExpense = {removeExpense}/>
    </div>
  )
}
