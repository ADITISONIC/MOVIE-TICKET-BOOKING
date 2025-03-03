const express = require("express");
const { bookTicket, getBookings } = require("../controllers/bookingController");
const router = express.Router();

router.post("/", bookTicket);
router.get("/", getBookings);

module.exports = router;
