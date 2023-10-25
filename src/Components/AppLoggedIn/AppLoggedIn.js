import React, { useCallback } from "react";
import "./AppLoggedIn.css";
import CreatePlaylist from "../CreatePlaylist/CreatePlaylist";
import BannerFeatures from "../BannerFeatures/BannerFeatures";
import HomeFeatures from "../HomeFeatures/HomeFeatures";
import ModifyPlaylist from "../ModifyPlaylist/ModifyPlaylist";
import SearchAlbums from "../SearchAlbums/SearchAlbums";
import homeloggedin from "../AppLoggedIn/home-logged-in.png";
import { useEffect, useState } from "react";

function AppLoggedIn(props) {

  const [activeComp, setActiveComp] = useState("");

  const toggleActivComp = (comp) => {
      if(comp === "create") {
        setActiveComp(comp)
      }
      else if (comp === "modify") {
        setActiveComp(comp)
      }
      else if (comp === "search-albums") {
        setActiveComp(comp)
      }
      else {
        setActiveComp("home")
      }
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

    <div className="AppLoggedIn">

        <img src={homeloggedin} alt="loggedin-home" onClick={() => {setActiveComp("home")}} />

        <BannerFeatures toggleActiveComp={toggleActivComp} activeComp={activeComp} />

        {loadComp(activeComp)}
  
    </div>
  );
}

export default AppLoggedIn;
