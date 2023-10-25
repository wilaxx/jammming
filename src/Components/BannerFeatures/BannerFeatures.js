import React, { useState } from "react";

import "./BannerFeatures.css";

function BannerFeatures({ toggleActiveComp, activeComp }) {



  const handleCreate = (e) => {
    toggleActiveComp("create");
    e.target.classList.add("active");

  };

  const handleModify = (e) => {
    toggleActiveComp("modify");
    e.target.classList.add("active");
  };

  const handleSearchAlbums = (e) => {
    toggleActiveComp("search-albums");
    e.target.classList.add("active")
  };



  return (
    <div className="BannerFeatures">
        <nav className="BannerFeatures-nav">

        <div className="btn-wrapper">
          <button className="create-playlist" onClick={handleCreate} >
            Create playlist
          </button>
        </div>
  
        <div className="btn-wrapper">
          <button className="modify-playlist" onClick={handleModify} >
            Modify Playlists
          </button>
        </div>

        <div className="btn-wrapper"> 
          <button className="search-albums" onClick={handleSearchAlbums} >
            Search for albums
          </button>
          </div>
        </nav>
    </div>
  );
}

export default BannerFeatures;
