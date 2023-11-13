import React from "react";
import "./Playlist.css";
import Tracklist from "../Tracklist/Tracklist";

  const Playlist = (props) => {

    let activeComp = props.activeComp;

    const handleNameChange = ({target}) => {
      props.onNameChange(activeComp, target.value)
    };


    const handleClick = () => {
      props.onSave(activeComp);
      const resetInput = document.getElementById('plname-create');
      resetInput.value = "";
    };

    const modifyPlName = ({target}) => {
      props.onNameChange(target.value)
    }


    const updatePl = () => {
      props.onUpdate();
    };


    const loadComp = (comp) => {
      if(comp === "create") {
        return (
          <div className="Playlist-Create">
            <input
              type="text"
              aria-label="Name of the playlist"
              placeholder={"Type playlist name ..."}
              onChange={handleNameChange}
              id="plname-create"
            >
            </input>

            <Tracklist
            activeComp={props.activeComp} 
            tracks={props.tracks} 
            onRemove={props.onRemove}  
            isRemoval={true}
            tracksToAdd={props.tracksToAdd}
            tracksToRemove={props.tracksToRemove}
            playlistName={props.playlistName}
            playlistId={props.playlistId}  
            />
        
            <button onClick={handleClick}>
              Save to Spotify
            </button>
          </div>
        );
      }
      else if(comp === "modify") {
        return (
          <div className="Playlist-Modify">
          <input
            type="text"
            value={props.playlistName}
            aria-label="Name of the playlist"
            placeholder={props.playlistName}
            onChange={modifyPlName}
            id="plname-modify"
          >
          </input>

          <Tracklist
          activeComp={props.activeComp} 
          tracks={props.tracks} 
          onRemove={props.onRemove}  
          isRemoval={true} 
          />
      
          <button onClick={updatePl}>
            Update playlist !
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
