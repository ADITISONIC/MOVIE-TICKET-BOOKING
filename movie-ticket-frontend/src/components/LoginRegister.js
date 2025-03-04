import React, { useState } from "react";
import { register, login } from "../api";

const LoginRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleRegister = async () => {
    try {
      await register(email, password, role);
      alert("Registration successful!");
    } catch (error) {
      alert("Registration failed: " + error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      localStorage.setItem("token", response.data.token);
      alert("Login successful!");
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div>
      <h2>Login / Register</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="user">User</option>
        <option value="theater_owner">Theater Owner</option>
      </select>
      <button onClick={handleRegister}>Register</button>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginRegister;
