const { solveCube } = require("../utils/solver");

function solve(req, res) {
  const state = req.body?.state;
  const result = solveCube(state);
  if (result.error) {
    return res.status(400).json({ message: result.error });
  }
  return res.json({ moves: result.moves });
}

module.exports = { solve };
