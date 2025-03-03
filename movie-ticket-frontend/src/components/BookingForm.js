import React, { useState } from "react";
import { bookTicket } from "../api";

const BookingForm = ({ showId }) => {
  const [seats, setSeats] = useState(1);
  const [userId, setUserId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await bookTicket(showId, seats, userId);
    alert(`Booking successful! Total Price: $${response.totalPrice}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Seats:
        <input
          type="number"
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
          min="1"
          required
        />
      </label>
      <label>
        User ID:
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
      </label>
      <button type="submit">Book Now</button>
    </form>
  );
};

export default BookingForm;
