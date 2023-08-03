import "./App.css";
import { v4 as uuidv4 } from 'uuid';
import SearchBar from "./Components/SearchBar/SearchBar";
import SearchResults from "./Components/SearchResults/SearchResults";
import { useState, Suspense, lazy } from "react";
const Playlist = lazy(() => import ("./Components/Playlist/Playlist"));
  
function App() {
    
  const generateId = () => {
    //Doesn't work if you dont use certificate (to use HTTPS)
    let uuid = uuidv4();
    return uuid;
  }
  const keny = [
    {
      name: "Le Missile est lance",
      artist: "Keny Arkana",
      album: "L'esquisse (Mix-Tape Vol.1) (2005)",
      id: generateId()
    },
    {
      name: "La Main sur le Coeur",
      artist: "Keny Arkana",
      album: "mixtape: L'esquisse (Mix-Tape Vol.1) (2005)",
      id: generateId()
    },
    {
      name: "Ils Ont Peur de la Liberte",
      artist: "Keny Arkana",
      album: "Entre Ciment Et Belle Etoile",
      id: generateId()
    },
    {
      name: "Cinquieme Soleil",
      artist: "Keny Arkana",
      album: "Desobeissance",
      id: generateId()
    }, 
    {
      name: "Elan de Vie",
      artist: "Keny Arkana",
      album: "Avant l'Exode",
      id: generateId()
    }];
  const tsr = [
      {
        name: "Point final",
        artist: "TSR",
        album: "Fenetre sur Cour",
        id: generateId()
      },
      {
        name: "REI",
        artist: "TSR",
        album: "Tant Qu'on Est La",
        id: generateId()
      },
      {
        name: "Mot de Tete",
        artist: "TSR",
        album: "La Bombe H",
        id: generateId()
      },
      {
        name: "Pas D'Paradis",
        artist: "TSR",
        album: "Flaque de Samples",
        id: generateId()
    }];
   
  // Init tracksResults to store results to render in SearchResults's Tracklist component
  const [tracksResults, setTracksResults] = useState([]);
  // Init tracksPlaylist to store tracks added when clicking the + button from a Track in SearchResults's Tracklist
  const [tracksPlaylist, setTracksPlaylist] = useState([]);
  //Init Playlist name
  const [namePlaylist, setNamePlaylist] = useState("New playlist");
  //fonction updatePlaylistName to pass to Playlist-> onChange input field
  const updatePlaylistName = (name) => {
    setNamePlaylist(name);
  };
  // fonction onAdd to pass to SearchResults --> Tracklist --> Track: onClick button + 
  const onAdd = (track) => {    
    if (tracksPlaylist.every(element => element.id !== track.id)){
      setTracksPlaylist((prevTracks) => [...prevTracks, track] );
    }
    else {
      alert("deja dans la playlist")
    }
  };
  // fonction onRemove to pass to Playlist --> Tracklist --> Track->  onClick button -
  const onRemove = (track) => {
  console.log("removing..... : " + track.id + track.album);
    setTracksPlaylist((prevTracks) => prevTracks.filter((element) => element.id !== track.id));
  };
  // fonction onSearch to pass to SearchBar-> onClick button search
  const onSearch = (word) => {
      if(word === "keny"){
        setTracksResults((prevTracks) => [...keny]);
      }
      else if (word === "tsr"){
        setTracksResults((prevTracks) => [...tsr]);
      }
      else {
        setTracksResults((prevTracks) => []);
      }
      
  };
  //fonction onSave to pass to Playlist-> onClick button save
  const onSave = () => {
    console.log("apres SAVE tracksPlaylist vaut " + tracksPlaylist);
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
