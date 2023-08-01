import "./App.css";
import SearchBar from "./Components/SearchBar/SearchBar";
import SearchResults from "./Components/SearchResults/SearchResults";
import { useState, Suspense, lazy } from "react";
const Playlist = lazy(() => import ("./Components/Playlist/Playlist"));   



function App() {
    


  const keny = [
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

  const tsr = [
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
   
 
    // Init array to use in tracksResults
  const [tracksResults, setTracksResults] = useState([]);
  // Init array to use in Playlist
  const [tracksPlaylist, setTracksPlaylist] = useState([]);
  
  // fonction onAdd
const onAdd = (track) => {
  const updArray = [...tracksResults];
  setTracksResults(updArray => [...updArray, track]);
};

// fonction onRemove
const onRemove = (track) => {
  
};

    const onSearch = (word) => {
      if(word === "keny"){
        console.log("arkana");
        setTracksResults(keny);
      }
      else if (word === "tsr"){
        console.log("tsrtsr");
        setTracksResults(tsr);
      }
      else {
        console.log("pas trouve RIENN");
        setTracksResults([]);
      }
      
    };


  return (
    
    <div className="App">
      <header className="App-header">
        <h1>Ja<span>mmm</span>ing</h1>
      </header>

       <div className="App-search">
          <SearchBar onSearch={onSearch} />
         
          <div className="App-results">
          <SearchResults tracksResults={tracksResults} onAdd={onAdd} />
          <Suspense fallback={<h1>HELLO LAILAAAAAAAAAAAAAAA</h1>}>
          <Playlist onRemove={onRemove} tracksPlaylist={tracksPlaylist} />
          </Suspense>
          </div>
      </div>
     

    </div>
  );
};

export default App;
