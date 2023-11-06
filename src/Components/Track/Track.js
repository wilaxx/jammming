import React from "react";
import "./Track.css";

function Track(props) {

  const remFromPl = () => {
    props.onRemove(props.track);
  };

  const addToPl = () => {
    props.onAdd(props.track);
  }


  const removeTrack = () => {
    props.onRemove(props.activeComp, props.track);
  };

  const addTrack = () => {
    props.onAdd(props.activeComp, props.track);
  };

  const addFound = () => {

  };

  const action = () => {

    if (props.activeComp === "create") {
      if (props.isRemoval) {
        return (
        <button onClick={removeTrack} > - </button>
        );
      } else {
        return (
        <button onClick={addTrack} > + </button>
        );
      }
        
    }
    else if (props.activeComp === "modify") {
      return (
        <button onClick={remFromPl} > - </button>
        );
    }

    else if (props.activeComp === "deleted-tracks") {
      return (
        <button onClick={addToPl} > + </button>
        );
    }

    else if (props.activeComp === "search-modify") {
      return (
        <button onClick={addToPl} > + </button>
        );
    }



    
    
};

  return (
    <div className="Track">
      <div className="content-track">
        <h3>{props.track.name} </h3>
        <h4>{props.track.artist}</h4>
        <p>{props.track.album}</p>
      </div>
      {action()}
    </div>  
  );
};

export default Track;
