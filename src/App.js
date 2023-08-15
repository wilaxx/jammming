import "./App.css";
import dbaz from "./Utils/searchdb";
import SearchBar from "./Components/SearchBar/SearchBar";
import SearchResults from "./Components/SearchResults/SearchResults";
import { useState, useEffect, Suspense, lazy } from "react";
const Playlist = lazy(() => import ("./Components/Playlist/Playlist"));



function App() {

  const [tracksResults, setTracksResults] = useState([]);
  const [tracksPlaylist, setTracksPlaylist] = useState([]);
  const [namePlaylist, setNamePlaylist] = useState("New playlist");

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
    setTracksResults(prevTracks => []);
    if (word === "") {
      setTracksResults(prevTracks => []);
    }
    else {
      let word_lc = word.toLowerCase();
    for (const element of dbaz) {
        let results = [];
      for (const property in element) {
          let str = `${element[property]}`;
          let str_lc = str.toLowerCase();
          results.push(str_lc);
          };
        let cpt = 0;
        for (const i of results) {
            if (i.includes(word_lc)){
              cpt += 1;
            }
        }
          if (cpt !== 0){
            setTracksResults(prevTracks => [...prevTracks, element]);
          }      
      
    };
    
  }
    

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
