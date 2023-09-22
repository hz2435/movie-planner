import Discover from './components/Discover';
import { WatchlistProvider } from './components/WatchlistContext';
import Watchlist from './components/watchlist';

function App() {

  return (

    <WatchlistProvider>
      <Discover />
      <Watchlist />
    </WatchlistProvider>

  );
}

export default App;
