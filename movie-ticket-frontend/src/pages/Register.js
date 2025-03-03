import React, { useState } from "react";
import { registerUser } from "../api";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await registerUser(email, password, role);
    alert(`Registered as ${response.user.email}`);
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="theaterOwner">Theater Owner</option>
          </select>
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
