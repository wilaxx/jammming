import React from "react";
import "./Track.css";

function Track({track}) {
  let text = "+";
  return (
    <div className="Track">
      <div className="content-track">
        <h3>{track.name}</h3>
        <h4>{track.artist}</h4>
        <p>{track.album}</p>
      </div>
      <button>{text}</button>
    </div>  
  );
}

export default Track;
