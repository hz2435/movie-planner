import React, { createContext, useState, ReactNode } from 'react';
import { Movie } from '../models/movie.model';

type WatchlistContextType = {
  watchlist: Movie[];
  setWatchlist: React.Dispatch<React.SetStateAction<Movie[]>>
  addToWatchlist: (movie: Movie) => void;
};

export const WatchlistContext = createContext<WatchlistContextType>({} as WatchlistContextType);

type WatchlistProviderProps = {
  children: ReactNode;
};

export const WatchlistProvider: React.FC<WatchlistProviderProps> = ({ children }) => {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  const addToWatchlist = (movie: Movie) => {
    setWatchlist((prevWatchlist) => [...prevWatchlist, movie]);
  };

  const contextValue: WatchlistContextType = {
    watchlist,
    setWatchlist,
    addToWatchlist,
  };

  return (
    <WatchlistContext.Provider value={contextValue}>
      {children}
    </WatchlistContext.Provider>
  );
};
