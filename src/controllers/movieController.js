const Movie = require("../models/movieModel");

// Get all movies
const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching movies", error: error.message });
  }
};

// Add a new movie
const addMovie = async (req, res) => {
  const { title, description, duration, genre, releaseDate } = req.body;

  try {
    const newMovie = new Movie({
      title,
      description,
      duration,
      genre,
      releaseDate,
    });

    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding movie", error: error.message });
  }
};

module.exports = { getMovies, addMovie };
