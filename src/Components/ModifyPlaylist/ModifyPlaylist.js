import React from "react";
import "./ModifyPlaylist.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Tracklist from "../Tracklist/Tracklist";
import { Spotify } from "../../Utils/spotify";
import { useState, useEffect } from "react";


function ModifyPlaylist (props) {

 
  

  const [playlists, setPlaylists] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [activeTracks, setActiveTracks] = useState([]);
  const [tracksToRemove, setTracksToRemove] = useState([]);
  const [tracksToAdd, setTracksToAdd] = useState([]);
  const [playlistId, setPlaylistId] = useState("");


  const loadPlaylist = (e) => {
    const elem = e.target;
    let toInput = elem.textContent;
    let btnKey = elem.getAttribute('id');
    const foundPlaylist = playlists.find((playlist) => playlist.id === btnKey);

    let input = document.getElementById('plname-modify');
    // input.setAttribute('placeholder', toInput);
    setPlaylistName(toInput);

    if (foundPlaylist) {
      setTracksToRemove([]);
      setActiveTracks(foundPlaylist.tracks);
      setPlaylistId(foundPlaylist.id);
      // document.querySelector();
      
    } else {
      alert("impossible de récupérer ")
    }
  };

  const remFromPl = (track) => {
    setActiveTracks((prevTracks) => prevTracks.filter((element) => element.id !== track.id));
    setTracksToRemove(prevTracks => [track, ...prevTracks]);
  };

  const addToPl = (track) => {

    if (activeTracks.every(element => element.id !== track.id)) {
      setTracksToRemove(prevTracks => prevTracks.filter((element) => element.id !== track.id));
      setActiveTracks(prevTracks => [track, ...prevTracks]);
      setTracksToAdd(prevTracks => [track, ...prevTracks]);
    }
    else {
      alert("deja dans la playlist")
    }

    
  };

  const updatePl = async () => {
    await props.onUpdate(playlistId, playlistName, tracksToRemove, tracksToAdd);
    setTracksToRemove([]);
    setTracksToAdd([]);

  };

  const changePlName = (name) => {
    setPlaylistName(name)
  };


  
  useEffect(() => {

    const fetchPlaylists = async () => {

      try {
        const playlistsData =  await Spotify.getPlaylists();
        if(playlistsData) {
          setPlaylists(playlistsData)
        }
        else {
          console.log("no playlists found")
        }
      } catch (error) {
        console.error('an error occured during playlists retrieval', error)
      }
     
      };
    
      fetchPlaylists();
  }, []);


  return (

    <div className="ModifyPlaylist">

    <nav className="panel">
          {playlists.map((element) => {
            return(
              <button key={element.id} className="playlist-btn" onClick={loadPlaylist} id={element.id}> {element.name} </button>
              
            );
          })}
      </nav>

      <section className="plToModify">

        <Playlist 
        playlists={playlists} 
        tracks={activeTracks} 
        onNameChange={changePlName} 
        onUpdate={updatePl} 
        activeComp={props.activeComp} 
        onRemove={remFromPl}
        tracksToAdd={tracksToAdd}
        tracksToRemove={tracksToRemove}
        playlistName={playlistName}
        playlistId={playlistId}
        />

        <aside className="itemsDeleted">
            <Tracklist 
            tracks={tracksToRemove} 
            onAdd={addToPl} 
            activeComp="deleted-tracks" />       
        </aside>

      </section>
      
      <article className="addSongs">
        <p>Search for anothers songs to add to your playlist</p>
        <SearchBar onSearch={props.onSearch} activeComp={props.activeComp} />
        <SearchResults activeComp="search-modify" tracksResults={props.tracksResultsOfModify} onAdd={addToPl} />
      </article>

    </div>
  );
};

export default ModifyPlaylist;
