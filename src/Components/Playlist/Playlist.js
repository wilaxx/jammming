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
          
      </ul>

      <button>Save To Spotify</button>
    </div>
  );
}

export default Playlist;
