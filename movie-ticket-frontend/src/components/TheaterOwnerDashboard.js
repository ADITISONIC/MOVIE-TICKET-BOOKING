import React, { useState } from "react";
import { addShow, getShows } from "../api";

const TheaterOwnerDashboard = ({ theaterId }) => {
  const [shows, setShows] = useState([]);
  const [newShow, setNewShow] = useState({
    movieId: "",
    startTime: "",
    endTime: "",
    seatsAvailable: 0,
    basePrice: 0,
  });

  const fetchShows = async () => {
    const response = await getShows(newShow.movieId);
    setShows(response.data);
  };

  const handleAddShow = async () => {
    try {
      await addShow({ ...newShow, theaterId });
      alert("Show added successfully!");
      fetchShows();
    } catch (error) {
      alert("Failed to add show: " + error.message);
    }
  };

  return (
    <div>
      <h2>Theater Owner Dashboard</h2>
      <div>
        <h3>Add New Show</h3>
        <input
          type="text"
          placeholder="Movie ID"
          value={newShow.movieId}
          onChange={(e) => setNewShow({ ...newShow, movieId: e.target.value })}
        />
        <input
          type="datetime-local"
          value={newShow.startTime}
          onChange={(e) =>
            setNewShow({ ...newShow, startTime: e.target.value })
          }
        />
        <input
          type="datetime-local"
          value={newShow.endTime}
          onChange={(e) => setNewShow({ ...newShow, endTime: e.target.value })}
        />
        <input
          type="number"
          placeholder="Seats Available"
          value={newShow.seatsAvailable}
          onChange={(e) =>
            setNewShow({ ...newShow, seatsAvailable: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Base Price"
          value={newShow.basePrice}
          onChange={(e) =>
            setNewShow({ ...newShow, basePrice: e.target.value })
          }
        />
        <button onClick={handleAddShow}>Add Show</button>
      </div>
      <div>
        <h3>Shows</h3>
        <ul>
          {shows.map((show) => (
            <li key={show._id}>
              <p>Start Time: {new Date(show.startTime).toLocaleString()}</p>
              <p>End Time: {new Date(show.endTime).toLocaleString()}</p>
              <p>Seats Available: {show.seatsAvailable}</p>
              <p>Base Price: ${show.basePrice}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TheaterOwnerDashboard;
