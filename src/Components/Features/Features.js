import React, { useState, useEffect } from "react";
import "./Features.css";
import CreatePlaylist from "../CreatePlaylist/CreatePlaylist";
import ModifyPlaylist from "../ModifyPlaylist/ModifyPlaylist";
import SearchAlbums from "../SearchAlbums/SearchAlbums";
import HomeFeatures from "../HomeFeatures/HomeFeatures";
import homefeatures from "./home-features.png";


function Features(props) {

  const [activeComp, setActiveComp] = useState("home");
  console.log("la prop userPlaylists vaut : " + props.userPlaylists);

  const setActiveButton = (comp) => {
    const navButtons = document.querySelectorAll('.btn-wrapper button');
    const homeImage = document.querySelector('.Features img');
  
    navButtons.forEach((button) => {
      button.classList.remove('active');
    });

    homeImage.classList.remove('active');
  
    if (comp === "create") {
      document.querySelector('.create-playlist').classList.add('active');
    } else if (comp === "modify") {
      document.querySelector('.modify-playlist').classList.add('active');
    } else if (comp === "search-albums") {
      document.querySelector('.search-albums').classList.add('active');
    } else if (comp === "home") {
      homeImage.classList.add('active');
    }
    
  };

  const handleCreate = (e) => {
    setActiveComp("create");
    e.target.classList.add("active");

  };

  const handleModify = (e) => {
    setActiveComp("modify");
    e.target.classList.add("active");
  };

  const handleSearchAlbums = (e) => {
    setActiveComp("search-albums");
    e.target.classList.add("active")
  };

  const handleHomeClick = () => {
    setActiveComp("home");
    setActiveButton("home");
  };

  const loadComp = (comp) => {
    if(comp === "create") {
      return (
        <CreatePlaylist
        onSearch={props.onSearch}
        tracksResultsOfCreate={props.tracksResultsOfCreate} 
        onAdd={props.onAdd}
        onRemove={props.onRemove} 
        tracksPlaylistOfCreate={props.tracksPlaylistOfCreate} 
        namePlaylistOfCreate={props.namePlaylistOfCreate} 
        onNameChange={props.onNameChange} 
        onSave={props.onSave}
        activeComp={activeComp} />
      );
    }
    else if(comp === "modify") {
      return (
        <ModifyPlaylist
        onSearch={props.onSearch}
        tracksResultsOfModify={props.tracksResultsOfModify}
        onAdd={props.onAdd}
        onRemove={props.onRemove}
        tracksPlaylistOfModify={props.tracksPlaylistOfModify}
        namePlaylistOfModify={props.namePlaylistOfModify} 
        onNameChange={props.onNameChange} 
        onSave={props.onSave}
        activeComp={activeComp}
        userPlaylists={props.userPlaylists}
          />
      );
    }
    else if(comp === "search-albums") {
      return (
        <SearchAlbums
        onSearchOfSearchalb={props.onSearchOfSearchalb}
        tracksResultsOfSearchalb={props.tracksResultsOfSearchalb}
         />
      );
    }
    else if (comp === "home") {
      return (
        <HomeFeatures />
      );
    }
  };

  

  useEffect(() => {
    setActiveButton(activeComp);
  }, [activeComp]);


  return (

    <div className="Features">

      <img src={homefeatures} alt="home-features" onClick={handleHomeClick} />

      <div className="banner">
        <nav className="banner-nav">

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

   {loadComp(activeComp)}

    </div>
  );
}

export default Features;
