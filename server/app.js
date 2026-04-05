const express = require("express");
const cors = require("cors");

const solveRoutes = require("./routes/solveRoutes");
const detectRoutes = require("./routes/detectRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "2mb" }));

app.get("/", (req, res) => {
  res.json({ status: "Cube Solver API" });
});

// Backend exposes REST endpoints consumed by the frontend via Fetch.
app.use("/api/solve", solveRoutes);
app.use("/api/detect", detectRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
});

module.exports = app;
