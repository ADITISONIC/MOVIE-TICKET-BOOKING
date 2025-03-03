const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  showId: { type: mongoose.Schema.Types.ObjectId, ref: "Show", required: true },
  seatsBooked: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  bookingTime: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
