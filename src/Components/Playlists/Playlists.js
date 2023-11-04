import React from "react";
import "./Playlists.css";
import Playlist from "../Playlist/Playlist";
import Tracklist from "../Tracklist/Tracklist";

function Playlists (props) {

  let playlists = props.userPlaylists;


  return (
    <div className="Playlists">
        
      <nav className="panel">
          {playlists.map((element) => {
            return(
              <button key={element.id} className="playlist-btn"> {element.name} </button>
              
            );
          })}
      </nav>

      <section className="plToModify">

        <Playlist playlists={playlists} tracks={props.tracks} onNameChange={props.onNameChange} onSave={props.onSave} activeComp={props.activeComp} onRemove={props.onRemove} />

        <aside className="itemsDeleted">
            <Tracklist tracks={props.tracks} onRemove={props.onRemove} />       
        </aside>

      </section>

    </div>
  );
};

export default Playlists;
