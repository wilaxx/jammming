import React from "react";
import "./Track.css";

function Track(props) {
  
  const removeTrack = () => {

  };

  const addTrack = () => {

  };

  const action = () => {
    if (props.isRemoval) {
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
        <h3>{props.track.name}</h3>
        <h4>{props.track.artist}</h4>
        <p>{props.track.album}</p>
      </div>
      <button>{action()}</button>
    </div>  
  );
};

export default Track;
