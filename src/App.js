import "./App.css";
import SearchBar from "./Components/SearchBar/SearchBar";
import SearchResults from "./Components/SearchResults/SearchResults";

function App() {
  return (
    <div className="App">
      
      <header className="App-header">
        <h1>Ja<span>mmm</span>ing</h1>
      </header>

      <div className="App-search">
        <div className="App-searchbar">
          <SearchBar />
        </div>
        <div className="App-searchresults">
        <SearchResults />
        </div>
      </div>

    </div>
  );
}

export default App;
