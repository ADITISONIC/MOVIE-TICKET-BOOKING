import React, { useState } from "react";
import ShowList from "../components/ShowList";

const Shows = () => {
  const [movieId, setMovieId] = useState("");

  return (
    <div>
      <h1>Shows</h1>
      <input
        type="text"
        placeholder="Enter Movie ID"
        value={movieId}
        onChange={(e) => setMovieId(e.target.value)}
      />
      {movieId && <ShowList movieId={movieId} />}
    </div>
  );
};

export default Shows;
