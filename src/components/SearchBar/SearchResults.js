import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Cards from '../card/card';
import "../card/card.css";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const searchMovies = async () => {
      const query = new URLSearchParams(location.search).get('query');
      if (!query) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // First, search for movies using TMDB API
        const tmdbResponse = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
          params: {
            api_key: '4e44d9029b1270a757cddc766a1bcb63',
            query: query,
            language: 'en-US',
            page: 1,
            include_adult: true
          }
        });

        // Map the TMDB results to match your Cards component props
        const mappedResults = tmdbResponse.data.results.map(movie => ({
          id: movie.id,
          poster_path: movie.poster_path,
          original_title: movie.title,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
          overview: movie.overview
        }));

        setResults(mappedResults);
      } catch (err) {
        setError("An error occurred while fetching results");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    searchMovies();
  }, [location.search]);

  if (loading) return <div className="cards">Loading...</div>;
  if (error) return <div className="cards">{error}</div>;
  if (results.length === 0) return <div className="cards">No results found.</div>;

  return (
    <div className="movie__list">
      <h2 className="list__title">Search Results</h2>
      <div className="list__cards">
        {results.map((movie) => (
          <Cards
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;