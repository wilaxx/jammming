import React from "react";
import "./Playlist.css";
import Tracklist from "../Tracklist/Tracklist";

  const Playlist = ({ tracksPlaylist, onRemove, onNameChange }) => {

    const updateName = ({target}) => {
      onNameChange(target.value)
    }

    const handleClick
  return (
  
    <div className="Playlist">
      <input
        type="text"
        aria-label="Name of the playlist"
        placeholder="Type playlist name ..."
        onChange={updateName}
      >
      </input>

      <Tracklist 
      tracks={tracksPlaylist} 
      onRemove={onRemove}  
      isRemoval={true} 
      />
  
      <button onClick={}>
        Save To Spotify
      </button>
    </div>
  );
};

export default Playlist;
