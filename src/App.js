import "./App.css";
import { v4 as uuidv4 } from "uuid";
import SearchBar from "./Components/SearchBar/SearchBar";
import SearchResults from "./Components/SearchResults/SearchResults";
import { useState, useEffect, Suspense, lazy } from "react";
const Playlist = lazy(() => import ("./Components/Playlist/Playlist"));



function App() {

  const [tracksResults, setTracksResults] = useState([]);
  const [tracksPlaylist, setTracksPlaylist] = useState([]);
  const [namePlaylist, setNamePlaylist] = useState("New playlist");

  const dbaz = [
    {
    name:"SummertimeOfOurLives",
    album: "HereimeWeCome",
    artist:"a1"
    },
    {
    name:"ReadyOrNot",
    album:"HereWeCome",
    artist:"a1"
    }, 
    {
    name:"Everytime",
    album:"HereWeCome",
    artist:"a1"
    },
    {
    name:"IfOnly",
    album:"HereWeCome",
    artist:"a1"
    }
]

  const updatePlaylistName = (name) => {
    setNamePlaylist((prevName) => name);
  };

  const onAdd = (track) => {    
    if (tracksPlaylist.every(element => element.id !== track.id)){
      setTracksPlaylist((prevTracks) => [...prevTracks, track] );
    }
    else {
      alert("deja dans la playlist")
    }
  };

  const onRemove = (track) => {
    setTracksPlaylist((prevTracks) => prevTracks.filter((element) => element.id !== track.id));
  };

  const onSearch = (word) => {
    const results = [];

    for (const element of dbaz) {
      for (const property in element) {
          let mot = `${element[property]}`;
          if (mot.includes(word)) {
            results.push(element);
          }
          };
  
      
    };

    setTracksResults((prevTracks) => [...results]);

}
  const onSave = () => {
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
          <Playlist onRemove={onRemove} tracksPlaylist={tracksPlaylist} namePlaylist={namePlaylist} onNameChange={updatePlaylistName} onSave={onSave} />
          </Suspense>
          </div>
      </div>

    </div>
  );
  };

export default App;
