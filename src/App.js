import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/header';
import Home from './pages/home/home'
import MovieList from './components/movieList/movieList';
import Movie from './pages/home/movieDetail/movie';
import SearchResults from './components/SearchBar/SearchResults'; // Import the SearchResults component

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route index element={<Home/>}></Route>
          <Route path='movie/:id' element={<Movie />}></Route>
          <Route path='movies/:type' element={<MovieList />}></Route>
          <Route path='search' element={<SearchResults />}></Route> {/* Add this line */}
          <Route path='/*' element={<h1>error page</h1>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;