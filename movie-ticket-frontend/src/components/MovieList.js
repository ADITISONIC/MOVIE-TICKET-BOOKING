import React, { useEffect, useState } from "react";
import { getMovies } from "../api";
import { Link } from "react-router-dom";

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getMovies();
      setMovies(data);
    };
    fetchMovies();
  }, []);

  return (
    <div>
      <h2>Movies</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>
            <h3>{movie.title}</h3>
            <p>{movie.description}</p>
            <Link to={`/shows/${movie._id}`}>View Shows</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
