import React from "react";
import "./Track.css";

function Track() {
  let text = "+";
  return (
    <div className="Track">
      <div className="content-track">
        <h3>Titre</h3>
        <h4>by Artiste</h4>
        <p>album</p>
      </div>
      <button>{text}</button>
    </div>  
  );
}

export default Track;
