import React, { useEffect, useState } from "react";
import { getShows } from "../api";
import BookingForm from "./BookingForm";

const ShowList = ({ movieId }) => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      const response = await getShows(movieId);
      setShows(response.data);
    };
    fetchShows();
  }, [movieId]);

  return (
    <div>
      <h2>Shows</h2>
      <ul>
        {shows.map((show) => (
          <li key={show._id}>
            <p>Start Time: {new Date(show.startTime).toLocaleString()}</p>
            <p>End Time: {new Date(show.endTime).toLocaleString()}</p>
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
