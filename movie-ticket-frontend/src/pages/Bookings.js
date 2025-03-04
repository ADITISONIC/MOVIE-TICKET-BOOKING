import React, { useState } from "react";
import UserBookings from "../components/UserBookings";

const Bookings = () => {
  const [userId, setUserId] = useState("");

  return (
    <div>
      <h1>Your Bookings</h1>
      <input
        type="text"
        placeholder="Enter User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      {userId && <UserBookings userId={userId} />}
    </div>
  );
};

export default Bookings;
