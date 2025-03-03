import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ShowList from "./components/ShowList";
import Navbar from "./components/Navbar";
import BookingForm from "./components/BookingForm";
import MovieList from "./components/MovieList";

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/shows/:movieId" element={<ShowList />} />
        </Routes>
      </Router>
      <BookingForm />
      <MovieList/>
      <ShowList/>
    </div>
  );
};

export default App;
