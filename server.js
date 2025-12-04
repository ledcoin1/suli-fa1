const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const DB_FILE = "users.json";

// Егер файл бар болса, оқимыз
let users = [];
if (fs.existsSync(DB_FILE)) {
  users = JSON.parse(fs.readFileSync(DB_FILE));
}

// Жаңа қолданушы қосу
app.post("/add-user", (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ error: "ID керек" });

  if (!users.includes(id)) {
    users.push(id);
    fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2));
  }

  res.json({ success: true });
});

// Барлық қолданушыларды көру
app.get("/users", (req, res) => {
  res.json(users);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
