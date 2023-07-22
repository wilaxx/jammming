import React from "react";
import "./Playlist.css";

function Playlist() {
  return (
    <div className="Playlist">
      <input
        type="text"
        aria-label="Name of the playlist"
        placeholder="Type playlist name ..."
      >
      </input>
      
      <ul className="Playlist-tracks">
          <li>Il etait une fois ...</li>
          <li>Jamming</li>
          <li>Cinquieme Soleil</li>
          <li>Changes</li>
          <li>Elan de vie</li>
          <li>Bohemian Rapsody</li>
          
      </ul>

      <button>Save To Spotify</button>
    </div>
  );
}

export default Playlist;
