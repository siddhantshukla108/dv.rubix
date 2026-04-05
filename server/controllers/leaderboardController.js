const Score = require("../models/Score");
const { sanitizeString } = require("../utils/sanitize");

async function getScores(req, res) {
  const scores = await Score.find().sort({ time: 1 }).limit(20).lean();
  res.json({ scores });
}

async function postScore(req, res) {
  const username = sanitizeString(req.body?.username);
  const time = Number(req.body?.time);
  const moves = Number(req.body?.moves);

  if (!username || Number.isNaN(time) || Number.isNaN(moves)) {
    return res.status(400).json({ message: "Invalid score payload." });
  }

  const score = await Score.create({ username, time, moves });
  return res.status(201).json({ score });
}

module.exports = { getScores, postScore };
