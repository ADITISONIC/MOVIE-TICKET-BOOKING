import React, { useState } from "react";
import { bookTicket } from "../api";

const BookingForm = ({ showId }) => {
  const [seats, setSeats] = useState(1);
  const [userId, setUserId] = useState("");

  const handleBooking = async () => {
    try {
      await bookTicket(showId, seats, userId);
      alert("Booking successful!");
    } catch (error) {
      alert("Booking failed: " + error.message);
    }
  };

  return (
    <div>
      <h2>Book Tickets</h2>
      <input
        type="number"
        placeholder="Seats"
        value={seats}
        onChange={(e) => setSeats(e.target.value)}
      />
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={handleBooking}>Book Now</button>
    </div>
  );
};

export default BookingForm;
