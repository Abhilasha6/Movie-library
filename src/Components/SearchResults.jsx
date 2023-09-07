// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';

// const apiKey = '739555e4330d8cb3b785e03a08a6d4c5'; // Replace with your API key
// const apiUrl = 'https://api.themoviedb.org/3/search/movie';
// const imgBaseUrl = 'https://image.tmdb.org/t/p/original';

// const SearchResults = () => {
//     const [searchResults, setSearchResults] = useState([]);
//     const location = useLocation();
//     const searchQuery = new URLSearchParams(location.search).get('query');

//     useEffect(() => {
//         const fetchSearchResults = async () => {
//             const options = {
//                 method: 'GET',
//                 headers: {
//                     accept: 'application/json',
//                     Authorization: `Bearer ${apiKey}`,
//                 },
//             };

//             try {
//                 const response = await fetch(`${apiUrl}?query=${searchQuery}&include_adult=false&language=en-US&page=1`, options);
//                 const data = await response.json();
//                 setSearchResults(data.results);
//             } catch (error) {
//                 console.error(error);
//             }
//         };

//         fetchSearchResults();
//     }, [searchQuery]);

//     return (
//         <div className="search-results">
//             <h2>Search Results for "{searchQuery}"</h2>
//             {searchResults.map((movie) => (
//                 <div key={movie.id}>
//                     <img src={`${imgBaseUrl}/${movie.poster_path}`} alt={movie.title} />
//                     <p>{movie.title}</p>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default SearchResults;
