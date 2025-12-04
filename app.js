import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:3000";

function App() {
  const [tgUser, setTgUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [choice, setChoice] = useState(null);
  const [result, setResult] = useState("");

  useEffect(() => {
    // Telegram WebApp SDK арқылы пайдаланушыны алу
    const user = window.Telegram.WebApp.initDataUnsafe.user;
    setTgUser(user);

    // Серверге логин
    fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.id, username: user.username }),
    })
      .then(res => res.json())
      .then(data => setBalance(data.balance));
  }, []);

  const play = (userChoice) => {
    setChoice(userChoice);
    const options = ["rock", "paper", "scissors"];
    const botChoice = options[Math.floor(Math.random() * 3)];

    let outcome = "";
    if (userChoice === botChoice) outcome = "Draw!";
    else if (
      (userChoice === "rock" && botChoice === "scissors") ||
      (userChoice === "paper" && botChoice === "rock") ||
      (userChoice === "scissors" && botChoice === "paper")
    ) {
      outcome = "You win!";
      setBalance(prev => prev + 10);
      updateBalance(balance + 10);
    } else {
      outcome = "You lose!";
      setBalance(prev => prev - 10);
      updateBalance(balance - 10);
    }

    setResult(`Bot chose ${botChoice}. ${outcome}`);
  };

  const updateBalance = (newBalance) => {
    fetch(`${API_URL}/update_balance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: tgUser.id, balance: newBalance }),
    });
  };

  if (!tgUser) return <div>Loading...</div>;

  return (
    <div style={{ textAlign: "center", padding: 50 }}>
      <h1>Тас-Қағаз-Қайшы</h1>
      <p>Баланс: {balance}</p>
      <div>
        <button onClick={() => play("rock")}>🪨 Тас</button>
        <button onClick={() => play("paper")}>📄 Қағаз</button>
        <button onClick={() => play("scissors")}>✂️ Қайшы</button>
      </div>
      {result && <p>{result}</p>}
    </div>
  );
}

export default App;
