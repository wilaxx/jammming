import React from "react";
import "./Tracklist.css";
import Track from "../Track/Track"

function Tracklist({ tracks, onAdd, onRemove, isRemoval }) {
  
  const arrayToLoop = [...tracks];

  

  const listOfTracks = arrayToLoop.map((element, key) => {
    
    return (<Track 
    track={element} 
    key={key}
    onAdd={onAdd}
    onRemove={onRemove}
    isRemoval={isRemoval} 
    />); 
  });
  

  return (
    <div className="Tracklist">
      {listOfTracks}
    </div>

  );

  }

export default Tracklist;
