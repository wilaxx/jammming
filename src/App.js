import "./App.css";
import { Spotify } from "./Utils/spotify";
import Header from "./Components/Header/Header";
import AppSearch from "./Components/AppSearch/AppSearch";
import Landing from "./Components/Landing/Landing";
import { useState, useEffect } from "react";



function App() {

  const getLogState = (localTok) => {
    if(!localTok){
      return true;
    }
    else {
      return false;
    }
  };

  const loadComp = (status) => {
      if(status) {
        return (
          <AppSearch 
          onSearch={onSearch}
          tracksResults={tracksResults} 
          onAdd={onAdd}
          onRemove={onRemove} 
          tracksPlaylist={tracksPlaylist} 
          namePlaylist={namePlaylist} 
          onNameChange={updatePlaylistName} 
          onSave={onSave}
          />
        );
      }
      else {
        return (
          <Landing />
        );
      }
  };


  // Je choisis de vérifier le token access et jutilise un booleen true ou false comme dependance du useEfect car 
  // si j utilise le token access, comme il est rafraichit toutes les heures, et donc que sa valeur change,
  // ça relancera le useEffect comme la dépendanc change
  const [localAccessToken, setLocalAccessToken] = useState(localStorage.getItem('access_token'));
  const [tracksResults, setTracksResults] = useState([]);
  const [tracksPlaylist, setTracksPlaylist] = useState([]);
  const [namePlaylist, setNamePlaylist] = useState("New Playlist");
  const [isAuth, setIsAuth] = useState(getLogState(localAccessToken));
  
  useEffect(() => {
    // Vérifier si l'utilisateur est connecté (vérifiez le token d'accès ici)
    if (isAuth) {
      // On récupère les infos utilisateur nécessaires
      
    }
    else {
    
    }
  }, [isAuth]);


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
        setTracksResults((prev) => searchData);
        
      } catch (error) {
        console.error('An error occurred during the search:', error);
        throw error;
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

      <Header isAuth={isAuth} />

      {loadComp(isAuth)}
      
    </div>

  
    );
};

export default App;
