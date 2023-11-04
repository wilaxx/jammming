import React from "react";
import "./Playlist.css";
import Tracklist from "../Tracklist/Tracklist";

  const Playlist = (props) => {

    let activeComp = props.activeComp;
    console.log("tout de suite activeComp vaut : " + activeComp)

    const handleNameChange = ({target}) => {
      props.onNameChange(activeComp, target.value)
    };

    const handleClick = () => {
      props.onSave(activeComp);
      const resetInput = document.getElementById('plname-input');
      resetInput.value = "";
    }


    const loadComp = (comp) => {
      if(comp === "create") {
        return (
          <div className="Playlist">
            <input
              type="text"
              aria-label="Name of the playlist"
              placeholder="Type playlist name ..."
              onChange={handleNameChange}
              id="plname-input"
            >
            </input>

            <Tracklist
            activeComp={props.activeComp} 
            tracks={props.tracks} 
            onRemove={props.onRemove}  
            isRemoval={true} 
            />
        
            <button onClick={handleClick}>
              Save to Spotify
            </button>
          </div>
        );
      }
      else if(comp === "modify") {
        return (
          <div className="Playlist">
          <input
            type="text"
            aria-label="Name of the playlist"
            placeholder="Type playlist name ..."
            onChange={handleNameChange}
            id="plname-input"
          >
          </input>

          <Tracklist
          activeComp={props.activeComp} 
          tracks={props.tracks} 
          onRemove={props.onRemove}  
          isRemoval={true} 
          />
      
          <button onClick={handleClick}>
            Save
          </button>
        </div>
        );
      }
    };


  return (
    <>
  
      {loadComp(activeComp)}

    </>
  );
};

export default Playlist;
