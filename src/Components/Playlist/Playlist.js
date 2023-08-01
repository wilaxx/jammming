import React from "react";
import "./Playlist.css";
import Tracklist from "../Tracklist/Tracklist";

  const Playlist = ({ tracksPlaylist, onRemove, onNameChange, onSave }) => {

    const handleNameChange = ({target}) => {
      onNameChange(target.value)
    };

    // const handleClick = () => {
    //   onSave(playlistname.value);
    // }
  return (
  
    <div className="Playlist">
      <input
        type="text"
        aria-label="Name of the playlist"
        placeholder="Type playlist name ..."
        onChange={handleNameChange}
      >
      </input>

      <Tracklist 
      tracks={tracksPlaylist} 
      onRemove={onRemove}  
      isRemoval={true} 
      />
  
      <button onClick={onSave}>
        Save To Spotify
      </button>
    </div>
  );
};

export default Playlist;
