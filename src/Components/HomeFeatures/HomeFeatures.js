import React from "react";
import "./HomeFeatures.css";

function HomeFeatures() {
  return (
    <div className="HomeFeatures">
        <div className="create-guidelines">
          <p>Search for songs
            <br />
            Add tracks in a new playlist
            <br />
            Name your playlist then save it to Spotify
          </p>
        </div>
        <div className="modify-guidelines">
          <p>Here you can load you existing playlist 
            from your Spotify account
            <br /> 
            You can change the playlists titles,
            <br /> 
            remove tracks from it
            <br />
             or add new ones </p>
        </div>
        <div className="search-albums-guidelines">
          <p>Instead of searching for tracks, search for albums !!</p>
        </div>
    </div>
  );
}

export default HomeFeatures;
