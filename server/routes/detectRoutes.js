const express = require("express");
const multer = require("multer");
const { detect } = require("../controllers/detectController");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("image"), detect);

module.exports = router;
