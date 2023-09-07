import React, { useState } from "react";
import netflix from "../../Assets/Moviebrary.png";
import { Link } from "react-router-dom";
import { ImSearch } from "react-icons/im";
import "./Header.scss";

const apiKey = "739555e4330d8cb3b785e03a08a6d4c5"; // Replace with your API key
const apiUrl = "https://api.themoviedb.org/3/search/movie";
const imgBaseUrl = "https://image.tmdb.org/t/p/original";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      // Don't search if the query is empty
      return;
    }

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };
    fetch(
      `${apiUrl}?query=${searchQuery}&include_adult=false&language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        // Limit the results to the top 5
        setSearchResults(data.results.slice(0, 5));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <nav className="header">
        <img src={netflix} alt="neflix-logo" className="logo" />
        <div>
          <Link to="/tvshows">TV Shows</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/recent">Recently Added</Link>
          <Link to="/mylist">My List</Link>
        </div>
      </nav>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>
          <ImSearch />
        </button>
      </div>
      <div className="search-results">
        {searchResults.map((movie) => (
          <div key={movie.id} className="top5">
            {/* <h2>Matching Results</h2> */}
            <img src={`${imgBaseUrl}/${movie.poster_path}`} alt={movie.title} />
            <p>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;
