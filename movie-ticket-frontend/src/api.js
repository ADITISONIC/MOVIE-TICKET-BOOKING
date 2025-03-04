import axios from "axios";

const API_URL = "http://localhost:3000/api"; // Replace with your backend URL

// Register a new user
export const register = async (email, password, role) => {
  return axios.post(`${API_URL}/auth/register`, { email, password, role });
};

// Login user
export const login = async (email, password) => {
  return axios.post(`${API_URL}/auth/login`, { email, password });
};

// Get all movies
export const getMovies = async () => {
  return axios.get(`${API_URL}/movies`);
};

// Add a new movie
export const addMovie = async (movieData) => {
  return axios.post(`${API_URL}/movies`, movieData);
};

// Get all shows for a movie
export const getShows = async (movieId) => {
  return axios.get(`${API_URL}/shows?movieId=${movieId}`);
};

// Add a new show
export const addShow = async (showData) => {
  return axios.post(`${API_URL}/shows`, showData);
};

// Book tickets
export const bookTicket = async (showId, seats, userId) => {
  return axios.post(`${API_URL}/bookings`, { showId, seats, userId });
};

// Get all bookings for a user
export const getBookings = async (userId) => {
  return axios.get(`${API_URL}/bookings?userId=${userId}`);
};
