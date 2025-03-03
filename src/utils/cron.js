const cron = require("node-cron");
const Booking = require("../models/bookingModel");
const { releaseSeats } = require("./redis");

cron.schedule("*/5 * * * *", async () => {
  const expiredBookings = await Booking.find({
    status: "pending",
    bookingTime: { $lt: new Date(Date.now() - 10 * 60 * 1000) }, // 10 minutes ago
  });

  for (const booking of expiredBookings) {
    await releaseSeats(booking.showId, booking.seatsBooked);
    await Booking.findByIdAndUpdate(booking._id, { status: "cancelled" });
  }
});
