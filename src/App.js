import "./App.css";
import SearchBar from "./Components/SearchBar/SearchBar";
import SearchResults from "./Components/SearchResults/SearchResults";
import Playlist from "./Components/Playlist/Playlist";

function App() {
  return (
    <div className="App">
      
      <header className="App-header">
        <h1>Ja<span>mmm</span>ing</h1>
      </header>

      <div className="App-search">
          <SearchBar />
         
          <div className="App-results">
          <SearchResults />
          <Playlist />
          </div>
      </div>

    </div>
  );
}

export default App;
