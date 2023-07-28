import React from "react";
import "./Playlist.css";
import Tracklist from "../Tracklist/Tracklist";

function Playlist() {
  return (
    <div className="Playlist">
      <input
        type="text"
        aria-label="Name of the playlist"
        placeholder="Type playlist name ..."
      >
      </input>
      
      <Tracklist />

      <button>
        Save To Spotify
      </button>
    </div>
  );
}

export default Playlist;
