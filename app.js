const tg = window.Telegram.WebApp;
const userId = tg.initDataUnsafe.user.id;
const balanceEl = document.getElementById('balance');

// Балансты алу
function loadBalance() {
  fetch(`http://localhost:3000/get_balance?user_id=${userId}`)
    .then(res => res.json())
    .then(data => {
      balanceEl.innerText = `Баланс: ${data.balance}`;
    });
}

// Балансты жаңарту
function updateBalance(amount) {
  fetch('http://localhost:3000/update_balance', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId, amount })
  })
  .then(res => res.json())
  .then(data => {
    balanceEl.innerText = `Баланс: ${data.balance}`;
  });
}

// Батырмалар
document.getElementById('add10').addEventListener('click', () => updateBalance(10));
document.getElementById('remove10').addEventListener('click', () => updateBalance(-10));

// Алғашқы баланс жүктеу
loadBalance();
