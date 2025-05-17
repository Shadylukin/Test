import React, { useState } from 'react';

export default function SavingsTracker() {
  const [savings, setSavings] = useState([]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const addSaving = () => {
    if (amount && description) {
      setSavings([...savings, { amount: parseFloat(amount), description }]);
      setAmount('');
      setDescription('');
    }
  };

  const totalSavings = savings.reduce((total, item) => total + item.amount, 0);

  return (
    <div className="savings-tracker">
      <h1>Savings Tracker</h1>
      <div className="input-group">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={addSaving}>Add</button>
      </div>
      <h2>Total Savings: ${totalSavings.toFixed(2)}</h2>
      <ul>
        {savings.map((item, index) => (
          <li key={index}>
            ${item.amount.toFixed(2)} - {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
