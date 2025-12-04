const tg = window.Telegram.WebApp;
tg.expand();

const user = tg.initDataUnsafe.user || { id: 999, first_name: "TestUser" }; // тест үшін
const balanceEl = document.getElementById("balance");
const greetEl = document.getElementById("greet");
const resultEl = document.getElementById("result");
const betInput = document.getElementById("bet");
const playBtn = document.getElementById("play");

greetEl.innerText = `Сәлем, ${user.first_name}!`;

const API = "https://<ТВОЙ_BACKEND_URL>"; // Vercel немесе локал+ngrok URL

// Баланс алу
async function getBalance(){
  const res = await fetch(`${API}/balance?userId=${user.id}`);
  const data = await res.json();
  balanceEl.innerText = `Баланс: ${data.balance}`;
  return data.balance;
}

// Ойнау
playBtn.onclick = async () => {
  const bet = Number(betInput.value);
  if(bet <= 0){ alert("Ставка 0-ден үлкен болуы керек"); return; }
  const balance = await getBalance();
  if(bet > balance){ alert("Ставка балансқа сай емес"); return; }

  // Ойын нәтижесі: win немесе lose
  const win = Math.random() < 0.5; 
  const change = win ? bet : -bet;

  const res = await fetch(`${API}/change`,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({ userId:user.id, amount:change })
  });
  const data = await res.json();
  resultEl.innerText = win ? `Жеңдің! +${bet}` : `Ұттың! -${bet}`;
  balanceEl.innerText = `Баланс: ${data.balance}`;
  betInput.value="";
};

getBalance();
