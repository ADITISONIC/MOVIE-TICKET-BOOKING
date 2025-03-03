import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

export const getMovies = async () => {
  const response = await axios.get(`${API_BASE_URL}/movies`);
  return response.data;
};

export const getShows = async (movieId) => {
  const response = await axios.get(`${API_BASE_URL}/shows`, {
    params: { movieId },
  });
  return response.data;
};

export const bookTicket = async (showId, seats, userId) => {
  const response = await axios.post(`${API_BASE_URL}/bookings`, {
    showId,
    seats,
    userId,
  });
  return response.data;
};

export const registerUser = async (email, password, role) => {
  const response = await axios.post(`${API_BASE_URL}/auth/register`, {
    email,
    password,
    role,
  });
  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, {
    email,
    password,
  });
  return response.data;
};
