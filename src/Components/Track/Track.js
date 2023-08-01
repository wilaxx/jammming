import React from "react";
import "./Track.css";

function Track({track}) {
  
  return (
    <div className="Track">
      <div className="content-track">
        <h3>{track.name}</h3>
        <h4>{track.artist}</h4>
        <p>{track.album}</p>
      </div>
      <button>+</button>
    </div>  
  );
}

export default Track;
