import React, { useEffect, useState } from "react";
import { getBookings } from "../api";

const UserBookings = ({ userId }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await getBookings(userId);
      setBookings(response.data);
    };
    fetchBookings();
  }, [userId]);

  return (
    <div>
      <h2>Your Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking._id}>
            <p>Show ID: {booking.showId}</p>
            <p>Seats Booked: {booking.seatsBooked}</p>
            <p>Total Price: ${booking.totalPrice}</p>
            <p>Status: {booking.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserBookings;
