import "./App.css";
import { Spotify } from "./Utils/spotify";
import Header from "./Components/Header/Header";
import Features from "./Components/Features/Features";
import Landing from "./Components/Landing/Landing";
import { useState, useEffect } from "react";



function App() {

  const [userName, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [activeComp, setActiveComp] = useState(null);
  
  const [tracksResultsOfCreate, setTracksResultsOfCreate] = useState([]);
  const [tracksPlaylistOfCreate, setTracksPlaylistOfCreate] = useState([]);
  const [namePlaylistOfCreate, setNamePlaylistOfCreate] = useState("New Playlist");

  const [tracksResultsOfModify, setTracksResultsOfModify] = useState([]);
  const [tracksPlaylistOfModify, setTracksPlaylistOfModify] = useState([]);
  const [namePlaylistOfModify, setNamePlaylistOfModify] = useState("New Playlist");

  const [tracksResultsOfSearchalb, setTracksResultsOfSearchalb] = useState([]);

  const [isAuth, setIsAuth] = useState(null);


 //functions sub components in features
  const updatePlaylistName = (comp, name) => {
    if (comp === "create") {
      setNamePlaylistOfCreate((prevName) => name);
    }
    else if (comp === "modify") {
      setNamePlaylistOfModify((prevName) => name);
    }
    
  };
  const onAdd = (comp, track) => {
    
    if (comp === "create") {

      if (tracksPlaylistOfCreate.every(element => element.id !== track.id)){
        setTracksPlaylistOfCreate((prevTracks) => [...prevTracks, track] );
      }
      else {
        alert("deja dans la playlist")
      }
  
    } else if (comp === "modify") {

      if (tracksPlaylistOfModify.every(element => element.id !== track.id)){
        setTracksPlaylistOfModify((prevTracks) => [...prevTracks, track] );
      }
      else {
        alert("deja dans la playlist")
      }
      
    }


    
  };
  const onRemove = (comp, track) => {

    if (comp === "create") {
      setTracksPlaylistOfCreate((prevTracks) => prevTracks.filter((element) => element.id !== track.id));
      
    } else if (comp === "modify") {
      setTracksPlaylistOfModify((prevTracks) => prevTracks.filter((element) => element.id !== track.id));

    }


    
  };
  const onSearch = async (comp, word) => {

    if (comp === "create") {

      try {

        if (word.trim() === "") {
          setTracksResultsOfCreate([]); 
          return;
        }

        const searchData = await Spotify.search(word);
        setTracksResultsOfCreate((prev) => searchData);
        
      } catch (error) {
        console.error('An error occurred during the search:', error.message);
        alert('an error appeared during the search')
      }
  
    } else if (comp === "modify") {
      try {

        if (word.trim() === "") {
          setTracksResultsOfModify([]); 
          return;
        }

        const searchData = await Spotify.search(word);
        setTracksResultsOfModify((prev) => searchData);
        
      } catch (error) {
        console.error('An error occurred during the search:', error.message);
        alert('an error appeared during the search')
      }
    }

      
    
    
   
  };
  const onSave = async (comp) => {
    
    if (comp === "create") {

      try {
        const namepl = namePlaylistOfCreate;
        const trackspl = [...tracksPlaylistOfCreate];
  
        await Spotify.savePlaylist(namepl, trackspl);
        alert("Playlist and tracks saved successfully.");
        
        setTracksPlaylistOfCreate(prev => []); // Effacer la liste des morceaux
        setNamePlaylistOfCreate("New Playlist");
      } catch (error) {
        console.error('An error occurred while saving the playlist:', error);
      }

  
    } else if (comp === "modify") {
      
      try {
        const namepl = namePlaylistOfModify;
        const trackspl = [...tracksPlaylistOfModify];
  
        await Spotify.savePlaylist(namepl, trackspl);
        alert("Playlist and tracks saved successfully.");
        
        setTracksPlaylistOfModify(prev => []); // Effacer la liste des morceaux
        setNamePlaylistOfModify("New Playlist");
      } catch (error) {
        console.error('An error occurred while saving the playlist:', error);
      }

    }
    
   

  };
  const onUpdate = async (playlistID, playlistName, addTracks, remTracks) => {
    
    try {
      await Spotify.updatePlaylist(playlistID, playlistName, addTracks, remTracks);
    } catch (error) {
      console.error(error)
    }
    
    
  };


// functions for the Header comp
  const logIn = async () => {
  await Spotify.authorize();
    };
  const logOut = () => {
    localStorage.clear();
    setIsAuth(false);
    };


  // function to launch with useEffect
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

  //function to use in the return to load appropriate component
    const loadComp = (isAuth) => {
    if(isAuth) {

      return (
        <Features
        onSearch={onSearch}
        tracksResultsOfCreate={tracksResultsOfCreate}
        tracksResultsOfModify={tracksResultsOfModify}
        onAdd={onAdd}
        onRemove={onRemove}
        tracksPlaylistOfCreate={tracksPlaylistOfCreate}
        tracksPlaylistOfModify={tracksPlaylistOfModify}
        namePlaylistOfCreate={namePlaylistOfCreate}
        namePlaylistOfModify={namePlaylistOfModify}
        onNameChange={updatePlaylistName}
        onSave={onSave}
        onUpdate={onUpdate}
        userPlaylists={userPlaylists}
        activeComp={activeComp}
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
           setUserId(Spotify.userId);
           setUsername(Spotify.userName);       
        }

      };
      
      checkStatus();

      
    }, [isAuth]);


    useEffect(() => {
      const handleScroll = () => {
        const header = document.querySelector('.Header');
        const scrollPosition = window.scrollY;
      
        if (scrollPosition > 0) {
          header.style.background = 'rgba(171, 171, 233, 0.8)'; 
        } else {
          header.style.backgroundColor = 'rgba(109, 102, 134, 0.4)';
        }
      };

      window.addEventListener('scroll', handleScroll);
      
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
