import React from "react";
import "./Tracklist.css";
import Track from "../Track/Track"

function Tracklist({searchResults}) {

  const arrayToLoop = [...searchResults];

  const listOfTracks = arrayToLoop.map((element, key) => {
    return <Track track={element} key={key} /> 
  });
  
  console.log(listOfTracks);


  return (
   
    <div className="Tracklist">
      {listOfTracks}
    </div>
  );

  }

export default Tracklist;
