const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const DB_FILE = "db.json";
let db = {};

if(fs.existsSync(DB_FILE)) db = JSON.parse(fs.readFileSync(DB_FILE));

function saveDb(){ fs.writeFileSync(DB_FILE, JSON.stringify(db,null,2)); }

const DEFAULT_BALANCE = 1000;

app.get("/balance",(req,res)=>{
  const userId = String(req.query.userId);
  if(!db[userId]) db[userId]={ balance:DEFAULT_BALANCE };
  saveDb();
  res.json({ balance: db[userId].balance });
});

app.post("/change",(req,res)=>{
  const { userId, amount } = req.body;
  const uid = String(userId);
  if(!db[uid]) db[uid]={ balance:DEFAULT_BALANCE };
  db[uid].balance += amount;
  saveDb();
  res.json({ balance: db[uid].balance });
});

const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`Server started on port ${port}`));
