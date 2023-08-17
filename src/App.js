import "./App.css";
import { Spotify } from "./Utils/spotify";
import SearchBar from "./Components/SearchBar/SearchBar";
import SearchResults from "./Components/SearchResults/SearchResults";
import { useState, Suspense, lazy } from "react";
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

  const onSearch = () => {
    let response = Spotify.search();
};

  const onSave = () => {
    let pltracks = [...tracksPlaylist];
    let plUris = pltracks.map((element) => element.trackURI);
    console.log("tracksPlaylist avant reset vaut : " + tracksPlaylist);
    console.log("name playlist avant reset vaut :" + namePlaylist);
    console.log(plUris);
    setTracksPlaylist(prev => []);
    setNamePlaylist(prev => "");
    console.log("tracksPlaylist apres reset vaut : " + tracksPlaylist);
    console.log("name playlist apres reset vaut :" + namePlaylist);
    

  };

  console.log("tracksPlaylist apres reset vaut : " + tracksPlaylist);
  console.log("name playlist apres reset vaut :" + namePlaylist);

 
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
