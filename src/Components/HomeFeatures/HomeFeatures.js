import React from "react";
import "./HomeFeatures.css";

function HomeFeatures() {
  return (
    <div className="HomeFeatures">
        <div className="create-guidelines">
          <p>Search for songs
            <br />
            Add tracks.
            <br />
            Name your playlist then save it to Spotify
          </p>
        </div>
        <div className="modify-guidelines">
          <p>Modify a playlist : 
            <br /> 
            You can change the playlist title,
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
