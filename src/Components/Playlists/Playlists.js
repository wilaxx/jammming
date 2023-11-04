import React from "react";
import "./Playlists.css";
import Playlist from "../Playlist/Playlist";

function Playlists (props) {

  let playlists = props.userPlaylists;


  return (
    <div className="Playlists">
        
      <nav className="panel">
          {playlists.map((element) => {
            return(
              <button key={element.id} className="playlist"> {element.name} + {element.tracks[0].name} </button>
              
            );
          })}
      </nav>

      <section className="plToModify">

        <Playlist playlists={playlists} tracks={props.tracks} onNameChange={props.onNameChange} onSave={props.onSave} activeComp={props.activeComp} onRemove={props.onRemove} />

        <aside className="itemsDeleted">
            <li>deleted 1</li>
            <li>deleted 2</li>        
        </aside>

      </section>

    </div>
  );
};

export default Playlists;
