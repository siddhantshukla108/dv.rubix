const express = require("express");
const { getScores, postScore } = require("../controllers/leaderboardController");

const router = express.Router();

router.get("/", getScores);
router.post("/", postScore);

module.exports = router;
