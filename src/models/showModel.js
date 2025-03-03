const mongoose = require("mongoose");

const showSchema = new mongoose.Schema({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  theaterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Theater",
    required: true,
  },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  seatsAvailable: { type: Number, required: true },
  basePrice: { type: Number, required: true },
});

module.exports = mongoose.model("Show", showSchema);
