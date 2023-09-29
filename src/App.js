import "./App.css";
import { Spotify } from "./Utils/spotify";
import SearchBar from "./Components/SearchBar/SearchBar";
import SearchResults from "./Components/SearchResults/SearchResults";
import { useState, Suspense, lazy } from "react";
const Playlist = lazy(() => import ("./Components/Playlist/Playlist"));



function App() {

  

  const [tracksResults, setTracksResults] = useState([]);
  const [tracksPlaylist, setTracksPlaylist] = useState([]);
  const [namePlaylist, setNamePlaylist] = useState("New Playlist");

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

  const onSearch = async (word) => {
      try {

        if (word.trim() === "") {
          setTracksResults([]); 
          return;
        }

        const searchData = await Spotify.search(word);
        setTracksResults((prev) => searchData)
      } catch (error) {
        console.error('An error occurred during the search:', error);
      }
    
    
   
};



  const onSave = async (namePaylist, tracksPlaylist) => {
    try {
      const namepl = namePaylist;
      const trackspl = [...tracksPlaylist];

      await Spotify.savePlaylist(namepl, trackspl);
      console.log("Playlist and tracks saved successfully.");
      
      // Réinitialiser les états
      setTracksPlaylist(prev => []); // Effacer la liste des morceaux
      setNamePlaylist("New Playlist");
    } catch (error) {
      console.error('An error occurred while saving the playlist:', error);
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
          
          <Suspense fallback={<h1> HELLO </h1>}>
          <Playlist onRemove={onRemove} tracksPlaylist={tracksPlaylist} namePlaylist={namePlaylist} onNameChange={updatePlaylistName} onSave={onSave} />
          </Suspense>
          </div>
      </div>

    </div>



  );
  };

export default App;
