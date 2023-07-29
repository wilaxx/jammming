import "./App.css";
import SearchBar from "./Components/SearchBar/SearchBar";
import SearchResults from "./Components/SearchResults/SearchResults";
import Playlist from "./Components/Playlist/Playlist";
import { useState } from "react";

function App() {

  const kenyArray = [
    {
      name: "Le Missile est lance",
      artist: "Keny Arkana",
      album: "L'esquisse (Mix-Tape Vol.1) (2005)",
      id: "01"
    },
    {
      name: "La Main sur le Coeur",
      artist: "Keny Arkana",
      album: "mixtape: L'esquisse (Mix-Tape Vol.1) (2005)",
      id: "02"
    },
    {
      name: "Ils Ont Peur de la Liberte",
      artist: "Keny Arkana",
      album: "Entre Ciment Et Belle Etoile",
      id: "03"
    },
    {
      name: "Cinquieme Soleil",
      artist: "Keny Arkana",
      album: "Desobeissance",
      id: "04"
    }, {
      name: "Elan de Vie",
      artist: "Keny Arkana",
      album: "Avant l'Exode",
      id: "05"
    }];

    const tsrArray = [
      {
        name: "Point final",
        artist: "TSR",
        album: "Fenetre sur Cour",
        id: "01"
      },
      {
        name: "REI",
        artist: "TSR",
        album: "Tant Qu'on Est La",
        id: "02"
      },
      {
        name: "Mot de Tete",
        artist: "TSR",
        album: "La Bombe H",
        id: "03"
      },
      {
        name: "Pas D'Paradis",
        artist: "TSR",
        album: "Flaque de Samples",
        id: "04"
      }];

    const [searchResults, setSearchResults] = useState(kenyArray);
    const changeArray = array => setSearchResults(array);
    ;

    setTimeout(() => {
      changeArray(tsrArray);
    }, "10000");
  return (
    <div className="App">
      
      <header className="App-header">
        <h1>Ja<span>mmm</span>ing</h1>
      </header>

       <div className="App-search">
          <SearchBar />
         
          <div className="App-results">
          <SearchResults searchResults={searchResults} trackList="kenyTracklist"/>
          <Playlist searchResults={searchResults}/>
          </div>
      </div>

      <footer>Yo la famille</footer>

    </div>
  );
}

export default App;
