const express = require("express");
const { getMovies, addMovie } = require("../controllers/movieController");
const router = express.Router();

router.get("/", getMovies);
router.post("/", addMovie);

module.exports = router;
