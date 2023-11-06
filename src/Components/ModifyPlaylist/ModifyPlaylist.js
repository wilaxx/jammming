import React from "react";
import "./ModifyPlaylist.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Tracklist from "../Tracklist/Tracklist";
import { useState } from "react";


function ModifyPlaylist (props) {

 
  let playlists = props.userPlaylists;
  
  const [activeTracks, setActiveTracks] = useState([]);
  const [deletedTracks, setDeletedTracks] = useState([]);

  const loadPlaylist = (e) => {
    const elem = e.target;
    let btnKey = elem.getAttribute('id');
    console.log("le btnKey vaut : " + btnKey)
    const foundPlaylist = playlists.find((playlist) => playlist.id === btnKey);

    if (foundPlaylist) {
      setActiveTracks(foundPlaylist.tracks);
      
    } else {
      alert("impossible de récupérer ")
    }
  };

  const remFromPl = (track) => {
    setActiveTracks((prevTracks) => prevTracks.filter((element) => element.id !== track.id));
    setDeletedTracks(prevTracks => [track, ...prevTracks]);
  };

  const addToPl = (track) => {

    if (activeTracks.every(element => element.id !== track.id)) {
      setDeletedTracks(prevTracks => prevTracks.filter((element) => element.id !== track.id));
      setActiveTracks(prevTracks => [track, ...prevTracks]);
    }
    else {
      alert("deja dans la playlist")
    }

    
  };




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

        <Playlist playlists={playlists} tracks={activeTracks} onNameChange={props.onNameChange} onSave={props.onSave} activeComp={props.activeComp} onRemove={remFromPl} />

        <aside className="itemsDeleted">
            <Tracklist tracks={deletedTracks} onAdd={addToPl} activeComp="deleted-tracks" />       
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
