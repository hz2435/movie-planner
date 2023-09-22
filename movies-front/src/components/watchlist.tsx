import { useEffect, useContext } from 'react';
import axios from 'axios';
import { Movie } from '../models/movie.model'
import { WatchlistContext} from './WatchlistContext';
import './styles.css';

function Watchlist() {
  const { watchlist, setWatchlist } = useContext(WatchlistContext);

  useEffect(() => {
    // Fetch data from the API endpoint
    axios.get(`${process.env.REACT_APP_API_HOST}/watchlist`)
      .then(response => {
        // can directly update the context
        setWatchlist(response.data.movies);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [setWatchlist]);

  return (
    <div className="watchlist">
      <h2>Watchlist</h2>
      <div className= "watchlist_container">
        {watchlist.map((movie: Movie, index: number) => (
          <div className="card" key={index}>
            <img src={movie.image_url} alt={movie.title} className="card_image" /> 
            <h3 className="card_title">{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Watchlist;
