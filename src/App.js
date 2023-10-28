import "./App.css";
import { Spotify } from "./Utils/spotify";
import Header from "./Components/Header/Header";
import Features from "./Components/Features/Features";
import Landing from "./Components/Landing/Landing";
import { useState, useEffect } from "react";



function App() {

  const [userName, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [tracksResults, setTracksResults] = useState([]);
  const [tracksPlaylist, setTracksPlaylist] = useState([]);
  const [namePlaylist, setNamePlaylist] = useState("New Playlist");
  const [isAuth, setIsAuth] = useState(null);
  // const [activeComp, setActiveComp] = useState("");

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
      alert("Playlist and tracks saved successfully.");
      
      // Réinitialiser les états
      setTracksPlaylist(prev => []); // Effacer la liste des morceaux
      setNamePlaylist("New Playlist");
    } catch (error) {
      console.error('An error occurred while saving the playlist:', error);
    }

  };

  const logIn = async () => {
  await Spotify.authorize();
    };
  const logOut = () => {
    localStorage.clear();
    setIsAuth(false);
    };
    const checkLoginStatus = async () => {
    let accessTokenCheck = await Spotify.getAccessToken();
    if(accessTokenCheck){
      setIsAuth(true);
    }
    else {
      let tokenUrlCheck = await Spotify.urlCodeToToken();
      if(tokenUrlCheck) {
        setIsAuth(true);
      }
      else {
        setIsAuth(false);
      }
    }
    };
    const loadComp = (isAuth) => {
    if(isAuth) {
      return (
        <Features
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


    useEffect(() => {
      const checkStatus = async () => {
        await checkLoginStatus();
        if(isAuth) {
           await Spotify.getCurrentUserProfile();
           setUserId(Spotify.userId)
           setUsername(Spotify.userName);
           await Spotify.getCurrentUserPlaylistsIds();
        }
       
      };
    
      checkStatus();
    }, [isAuth]);

    useEffect(() => {
      const handleScroll = () => {
        const header = document.querySelector('.Header');
        const scrollPosition = window.scrollY;
      
        if (scrollPosition > 0) {
          header.style.background = 'rgba(109, 102, 134, 0.98)'; 
        } else {
          header.style.backgroundColor = 'rgba(109, 102, 134, 0.4)';
        }
      };
  
      // Ajoutez un écouteur d'événement de défilement
      window.addEventListener('scroll', handleScroll);
  
      // Nettoyez l'écouteur lorsque le composant est démonté
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);



  return (
    
    <div className="App">

      <Header isAuth={isAuth} logIn={logIn} logOut={logOut} />

      {loadComp(isAuth)}
      
    </div>

  
    );
};

export default App;
