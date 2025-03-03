import React, { useEffect, useState } from "react";
import { getShows } from "../api";
import BookingForm from "./BookingForm";

const ShowList = ({ match }) => {
  const [shows, setShows] = useState([]);
  const movieId = match.params.movieId;

  useEffect(() => {
    const fetchShows = async () => {
      const data = await getShows(movieId);
      setShows(data);
    };
    fetchShows();
  }, [movieId]);

  return (
    <div>
      <h2>Shows</h2>
      <ul>
        {shows.map((show) => (
          <li key={show._id}>
            <h3>{show.startTime}</h3>
            <p>Seats Available: {show.seatsAvailable}</p>
            <p>Base Price: ${show.basePrice}</p>
            <BookingForm showId={show._id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowList;
