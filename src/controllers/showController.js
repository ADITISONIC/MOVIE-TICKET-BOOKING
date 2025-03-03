const Show = require("../models/showModel");

// Get all shows for a movie
const getShows = async (req, res) => {
  const { movieId } = req.query;

  try {
    const shows = await Show.find({ movieId }).populate("movieId", "title");
    res.status(200).json(shows);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching shows", error: error.message });
  }
};

// Add a new show
const addShow = async (req, res) => {
  const { movieId, theaterId, startTime, endTime, seatsAvailable, basePrice } =
    req.body;

  try {
    const newShow = new Show({
      movieId,
      theaterId,
      startTime,
      endTime,
      seatsAvailable,
      basePrice,
    });

    await newShow.save();
    res.status(201).json(newShow);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding show", error: error.message });
  }
};

module.exports = { getShows, addShow };
