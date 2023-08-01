import React from "react";
import "./Tracklist.css";
import Track from "../Track/Track"

function Tracklist({ tracks, action }) {
  
  const arrayToLoop = [...tracks];


  const listOfTracks = arrayToLoop.map((element, key) => {
    return <Track track={element} key={key} action={action} /> 
  });
  
  console.log(listOfTracks);


  return (
    <div className="Tracklist">
      {listOfTracks}
    </div>

  );

  }

export default Tracklist;
