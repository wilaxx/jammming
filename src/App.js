import "./App.css";
import { v4 as uuidv4 } from "uuid";
import AZlyrics from "./Utils/AZlyrics";
import SearchBar from "./Components/SearchBar/SearchBar";
import SearchResults from "./Components/SearchResults/SearchResults";
import { useState, Suspense, lazy } from "react";
const Playlist = lazy(() => import ("./Components/Playlist/Playlist"));

// const keny_url = "https://www.azlyrics.com/k/kenyarkana.html";


  // async function fetchMyDocument() {      
  //   try {
  //     let response = await fetch('/path/to/file.html'); // Gets a promise
  //     document.body.innerHTML = await response.text(); // Replaces body with response
  //   } catch (err) {
  //     console.log('Fetch error:' + err); // Error handling
  //   }
  // }

function App() {
  
  
  // async function fetchSource() {      
  //     let response = await fetch('https://www.azlyrics.com/k/kenyarkana.html', {
  //       mode: 'cors',
  //       headers: {
  //         'Origin': 'https://82.64.190.99:443',
  //         'Access-Control-Allow-Origin':'*',
  //         'Content-Type': 'text/html'
  //       }
  //     });
  //     if(response) {
  //       console.log('response exist')
  //       console.log(response)
  //     }
  //     if (response.ok){
  //       console.log("response.ok existe")
  //     }
  //     else {
  //       console.log("response.ok est false")
  //       console.log(response.ok)
  //     }
      
  // };

  // Init tracksResults to store results to render in SearchResults's Tracklist component
  const [tracksResults, setTracksResults] = useState([]);
  // Init tracksPlaylist to store tracks added when clicking the + button from a Track in SearchResults's Tracklist
  const [tracksPlaylist, setTracksPlaylist] = useState([]);
  //Init Playlist name
  const [namePlaylist, setNamePlaylist] = useState("New playlist");
  //fonction updatePlaylistName to pass to Playlist-> onChange input field
  const updatePlaylistName = (name) => {
    setNamePlaylist((prevName) => name);
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
    setTracksPlaylist((prevTracks) => prevTracks.filter((element) => element.id !== track.id));
  };
  // fonction onSearch to pass to SearchBar-> onClick button search
  const onSearch = (word) => {
      // if(word === "keny"){
      //   setTracksResults((prevTracks) => [...keny]);
      // }
      // else if (word === "tsr"){
      //   setTracksResults((prevTracks) => [...tsr]);
      // }
      // else {
      //   setTracksResults((prevTracks) => []);
      // }
      
  };
  //fonction onSave to pass to Playlist-> onClick button save
  const onSave = () => {
  }

  return (
    
    <div className="App">
      <header className="App-header">
        <h1>Ja<span>mmm</span>ing</h1>
      
      </header>

      <AZlyrics />

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
