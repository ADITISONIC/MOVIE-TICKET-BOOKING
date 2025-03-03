const express = require("express");
const { getShows, addShow } = require("../controllers/showController");
const router = express.Router();

router.get("/", getShows);
router.post("/", addShow);

module.exports = router;
