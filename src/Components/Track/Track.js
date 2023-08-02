import React from "react";
import "./Track.css";

function Track({ onRemove, onAdd, track, isRemoval }) {
  
  const removeTrack = (event) => {
    onRemove(track);
  };

  const addTrack = (event) => {
    console.log("on essaie d'ajouter : " + track.id + " de" + track.album)
    onAdd(track);
  };

  const action = () => {
    if (isRemoval) {
      return (
      <button onClick={removeTrack} > - </button>
      );
    }
      return (
      <button onClick={addTrack} > + </button>
      );
    
};

  return (
    <div className="Track">
      <div className="content-track">
        <h3>{track.name}</h3>
        <h4>{track.artist}</h4>
        <p>{track.album}</p>
      </div>
      {action()}
    </div>  
  );
};

export default Track;
