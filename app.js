const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const memoRoutes = require("./api/memoRoutes");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/memos", memoRoutes);

app.get("/", (req, res) => {
  res.send("📝 Simple Memo API is running...");
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));