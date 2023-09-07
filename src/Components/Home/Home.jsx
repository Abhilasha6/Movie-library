import React, { useEffect, useState } from "react";
import "./Home.scss";
import axios from "axios";
// import { Link } from "react-router-dom";
import { BiPlay } from "react-icons/bi";

const apiKey = "739555e4330d8cb3b785e03a08a6d4c5";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original";
const upcoming = "upcoming";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";

const Card = ({ img }) => <img className="card" src={img} alt="cover" />;

const MovieDetail = ({ movie }) => {
  return (
    <div className="movie-detail">
      <h3>{movie.original_title}</h3>
      <p>{movie.overview}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>Average vote: {movie.vote_average}</p>
    </div>
  );
};

const Home = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [genre, setGenre] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  //   const [selectedGenreId, setSelectedGenreId] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    const fetchUpcoming = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`);
      setUpcomingMovies(results);
    };
    const fetchNowPlaying = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`);
      setNowPlayingMovies(results);
    };
    const fetchPopular = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`);
      setPopularMovies(results);
    };
    const fetchTopRated = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`);
      setTopRatedMovies(results);
    };
    const getAllGenre = async () => {
      const {
        data: { genres },
      } = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`);
      setGenre(genres);
    };

    getAllGenre();
    fetchUpcoming();
    fetchNowPlaying();
    fetchPopular();
    fetchTopRated();
  }, []);

  const handleCardClick = (movie) => {
    setSelectedMovie(movie);
  };

  const filterMoviesByGenre = (movies, selectedGenres) => {
    if (selectedGenres.length === 0) {
      // If no genres selected, return all movies
      return movies;
    }

    return movies.filter((movie) =>
      movie.genre_ids.some((genreId) => selectedGenres.includes(genreId))
    );
  };

  return (
    <section className="home">
      <div
        className="banner"
        style={{
          backgroundImage: popularMovies[0]
            ? `url(${`${imgUrl}/${popularMovies[0].poster_path}`})`
            : "rgb(16, 16, 16)",
        }}
      >
        {popularMovies[0] && <h1>{popularMovies[0].original_title}</h1>}
        {popularMovies[0] && <p>{popularMovies[0].overview}</p>}

        <div>
          <button>
            <BiPlay /> Play{" "}
          </button>
          {/* <button>My List <AiOutlinePlus /> </button> */}
        </div>
      </div>

      <div className="genre-select">
        <label>
          <select
            value={selectedGenres}
            onChange={(e) => {
              const selectedOption = e.target.value;
              setSelectedGenres(selectedOption);
            }}
          >
            <option value="" disabled>
              Select Genre
            </option>
            {genre.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="recentplay">
        <h1>Now Playing</h1>
        {selectedMovie && (
          <div className="movie-detail-container">
            <MovieDetail movie={selectedMovie} />
            <button onClick={() => setSelectedMovie(null)}>X</button>
          </div>
        )}
        <div>
          {filterMoviesByGenre(nowPlayingMovies, selectedGenres).map(
            (item, index) => (
              <div key={index} onClick={() => handleCardClick(item)}>
                <Card img={`${imgUrl}/${item.poster_path}`} />
              </div>
            )
          )}
        </div>
      </div>

      <div className="popularmov">
        <h1>Popular</h1>
        {selectedMovie && (
          <div className="movie-detail-container">
            <MovieDetail movie={selectedMovie} />
            <button onClick={() => setSelectedMovie(null)}>X</button>
          </div>
        )}
        <div>
          {filterMoviesByGenre(popularMovies, selectedGenres).map(
            (item, index) => (
              <div key={index} onClick={() => handleCardClick(item)}>
                <Card img={`${imgUrl}/${item.poster_path}`} />
              </div>
            )
          )}
        </div>
      </div>

      <div className="upcoming">
        <h1>Upcoming</h1>
        {selectedMovie && (
          <div className="movie-detail-container">
            <MovieDetail movie={selectedMovie} />
            <button onClick={() => setSelectedMovie(null)}>X</button>
          </div>
        )}
        <div>
          {filterMoviesByGenre(upcomingMovies, selectedGenres).map(
            (item, index) => (
              <div key={index} onClick={() => handleCardClick(item)}>
                <Card img={`${imgUrl}/${item.poster_path}`} />
              </div>
            )
          )}
        </div>
      </div>

      <div className="toprated">
        <h1>Top Rated</h1>
        {selectedMovie && (
          <div className="movie-detail-container">
            <MovieDetail movie={selectedMovie} />
            <button onClick={() => setSelectedMovie(null)}>X</button>
          </div>
        )}
        {/* Use handleCardClick to set selected movie */}
        <div>
          {filterMoviesByGenre(topRatedMovies, selectedGenres).map(
            (item, index) => (
              <div key={index} onClick={() => handleCardClick(item)}>
                <Card img={`${imgUrl}/${item.poster_path}`} />
              </div>
            )
          )}
        </div>
      </div>
      {/* <Row title={"Upcoming"} arr={upcomingMovies} />
            <Row title={"Now Playing"} arr={nowPlayingMovies} />
            <Row title={"Popular"} arr={popularMovies} />
            <Row title={"Top Rated"} arr={topRatedMovies} /> */}

      {/* <div className="genreBox">
        {genre.map((item) => (
          <Link key={item.id} to={`/genre/${item.id}`}>
            {item.name}
          </Link>
        ))}
      </div> */}
      <footer>Made with ❤️ by Abhilasha</footer>
    </section>
  );
};

export default Home;
