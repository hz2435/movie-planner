import React, { useContext, useState } from 'react';
import axios from 'axios';
import { WatchlistContext } from './WatchlistContext'; 
import { Movie } from '../models/movie.model';
import './styles.css';


function Discover() {
  const [searchString, setSearchString] = useState('');
  const [searchResult, setSearchResult] = useState({} as Movie);
  const [notFound, setNotFound] = useState(false);
  const { addToWatchlist } = useContext(WatchlistContext);

  const handleSearch = async () => {
    axios.get(
      `${process.env.REACT_APP_API_HOST}/search`,
      {
        params: { title: searchString },
      },
    ).then((res) => {
      setNotFound(false);
      setSearchResult(res.data);
    }).catch(error => {
      setNotFound(true);
    })
  };

  const handleAddMovie = async () => {
    // hardcoded movie to add
    addToWatchlist(searchResult);

    await axios.post(
      `${process.env.REACT_APP_API_HOST}/watchlist/add`,
      searchResult,
    )
    .catch(error => {
      console.error('Error adding movie to watchlist:', error);
    });
  }

  return (
    <div className= "top_container">
      <h1 className="title"> Movie Planner</h1>
      <div>
          <h2>Movie Search: </h2>
          <input type="text" onChange={e => setSearchString(e.target.value)} />
          <button className="button" onClick={handleSearch}>Search</button>
          {notFound && <p> Movie not found </p>}
      </div>
      
      { searchResult.title &&
        (
          <div className="card">
            <img src={searchResult.image_url} alt={searchResult.title} className="card_image" /> 
            <h3 className="card_title">{searchResult.title}</h3>
            <button className="button" onClick={handleAddMovie}>Add Movie</button>
          </div>
        )
      }
      
    </div>
  );
}

export default Discover;
