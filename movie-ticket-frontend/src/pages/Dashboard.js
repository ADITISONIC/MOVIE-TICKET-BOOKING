import React, { useState } from "react";
import TheaterOwnerDashboard from "../components/TheaterOwnerDashboard";

const Dashboard = () => {
  const [theaterId, setTheaterId] = useState("");

  return (
    <div>
      <h1>Theater Owner Dashboard</h1>
      <input
        type="text"
        placeholder="Enter Theater ID"
        value={theaterId}
        onChange={(e) => setTheaterId(e.target.value)}
      />
      {theaterId && <TheaterOwnerDashboard theaterId={theaterId} />}
    </div>
  );
};

export default Dashboard;
