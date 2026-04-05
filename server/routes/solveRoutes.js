const express = require("express");
const { solve } = require("../controllers/solveController");

const router = express.Router();

router.post("/", solve);

module.exports = router;
