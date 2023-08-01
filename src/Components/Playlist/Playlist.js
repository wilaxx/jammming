import React from "react";
import "./Playlist.css";
import Tracklist from "../Tracklist/Tracklist";

  const Playlist = ({ tracksPlaylist, onRemove }) => {

    // sleep(10000);

  return (
  
    <div className="Playlist">
      <input
        type="text"
        aria-label="Name of the playlist"
        placeholder="Type playlist name ..."
      >
      </input>

      <Tracklist tracks={tracksPlaylist} action={onRemove} />
  
      <button>
        Save To Spotify
      </button>
    </div>
  );
};

export default Playlist;
