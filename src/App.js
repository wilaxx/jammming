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
      id: "keny01"
    },
    {
      name: "La Main sur le Coeur",
      artist: "Keny Arkana",
      album: "mixtape: L'esquisse (Mix-Tape Vol.1) (2005)",
      id: "keny02"
    },
    {
      name: "Ils Ont Peur de la Liberte",
      artist: "Keny Arkana",
      album: "Entre Ciment Et Belle Etoile",
      id: "keny03"
    },
    {
      name: "Cinquieme Soleil",
      artist: "Keny Arkana",
      album: "Desobeissance",
      id: "keny04"
    }, {
      name: "Elan de Vie",
      artist: "Keny Arkana",
      album: "Avant l'Exode",
      id: "keny05"
    }];
  const tsr = [
      {
        name: "Point final",
        artist: "TSR",
        album: "Fenetre sur Cour",
        id: "tsr01"
      },
      {
        name: "REI",
        artist: "TSR",
        album: "Tant Qu'on Est La",
        id: "tsr02"
      },
      {
        name: "Mot de Tete",
        artist: "TSR",
        album: "La Bombe H",
        id: "tsr03"
      },
      {
        name: "Pas D'Paradis",
        artist: "TSR",
        album: "Flaque de Samples",
        id: "tsr04"
    }];
   
  // Init tracksResults to store results to render in SearchResults's Tracklist component
  const [tracksResults, setTracksResults] = useState([]);
  // Init tracksPlaylist to store tracks added when clicking the + button from a Track in SearchResults's Tracklist
  const [tracksPlaylist, setTracksPlaylist] = useState([{
    name: "Le Missile est lance",
    artist: "Keny Arkana",
    album: "L'esquisse (Mix-Tape Vol.1) (2005)",
    id: "01"
  }, {
    name: "La Main sur le Coeur",
    artist: "Keny Arkana",
    album: "mixtape: L'esquisse (Mix-Tape Vol.1) (2005)",
    id: "02"
  }]);
  //Init Playlist name
  const [namePlaylist, setNamePlaylist] = useState("New playlist");
  //fonction updatePlaylistName to pass to Playlist-> onChange input field
  const updatePlaylistName = (name) => {
    setNamePlaylist(name);
    console.log("LE NOM DE LA PLAYLIST EST : " + name);
};
  // fonction onAdd to pass to SearchResults --> Tracklist --> Track: onClick button + 
  const onAdd = (track) => {
    console.log('La playlist vaut avant :' + tracksPlaylist);
    // const updArray = [...tracksPlaylist];
    // setTracksPlaylist(...updArray, keny[1]);
    // console.log("La playlist contient" + tracksPlaylist)
    setTracksPlaylist([...tracksPlaylist, track]);
    console.log('La playlist vaut APRES :' + tracksPlaylist);
  };
  // fonction onRemove to pass to Playlist --> Tracklist --> Track->  onClick button -
  const onRemove = (track) => {
  console.log("removing.....");
  };
  // fonction onSearch to pass to SearchBar-> onClick button search
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
  //fonction onSave to pass to Playlist-> onClick button save
  const onSave = () => {
    console.log("le nom de la playlist est : " + namePlaylist);
  }
  

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
          <Playlist onRemove={onRemove} tracksPlaylist={tracksPlaylist} namePlaylist={namePlaylist} onNameChange={updatePlaylistName} onSave={onSave} />
          </Suspense>
          </div>
      </div>
     

    </div>
  );
};

export default App;
