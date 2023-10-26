import React, { useState, useEffect } from "react";
import "./Features.css";
import CreatePlaylist from "../CreatePlaylist/CreatePlaylist";
import ModifyPlaylist from "../ModifyPlaylist/ModifyPlaylist";
import SearchAlbums from "../SearchAlbums/SearchAlbums";
import HomeFeatures from "../HomeFeatures/HomeFeatures";


function Features(props) {

  const [activeComp, setActiveComp] = useState("");

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

  const loadComp = (comp) => {
    if(comp === "create") {
      return (
        <CreatePlaylist
        onSearch={props.onSearch}
        tracksResults={props.tracksResults} 
        onAdd={props.onAdd}
        onRemove={props.onRemove} 
        tracksPlaylist={props.tracksPlaylist} 
        namePlaylist={props.namePlaylist} 
        onNameChange={props.onNameChange} 
        onSave={props.onSave} />
      );
    }
    else if(comp === "modify") {
      return (
        <ModifyPlaylist />
      );
    }
    else if(comp === "search-albums") {
      return (
        <SearchAlbums />
      );
    }
    else if (comp === "home") {
      return (
        <HomeFeatures />
      );
    }
  };

  useEffect(() => {
    if (activeComp === "create") {
       setActiveComp(activeComp) 
    }
    else if (activeComp === "modify") {
      setActiveComp(activeComp)
    }
    else if (activeComp === "search-albums") {
      setActiveComp(activeComp)
    }
    else {
      setActiveComp("home");
    }
  }, [activeComp]);


  return (

    <div className="Features">

      <img src={homeloggedin} alt="loggedin-home" onClick={() => {setActiveComp("home")}} />

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
