const API_URL = "https://backend-test-q8to.onrender.com";

const userId = "testuser123";

async function loadBalance() {
  const res = await fetch(`${API_URL}/get_balance?user_id=${userId}`);
  const data = await res.json();
  document.getElementById("balance").innerText = "Balance: " + data.balance;
}

async function addMoney() {
  await fetch(`${API_URL}/update_balance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, amount: 10 })
  });
  loadBalance();
}

async function removeMoney() {
  await fetch(`${API_URL}/update_balance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, amount: -10 })
  });
  loadBalance();
}

loadBalance();
