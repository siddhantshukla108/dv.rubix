const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  username: { type: String, required: true, trim: true },
  time: { type: Number, required: true, min: 1 },
  moves: { type: Number, required: true, min: 1 },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Score", scoreSchema);
