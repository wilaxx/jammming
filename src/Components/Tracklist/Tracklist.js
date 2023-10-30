import React from "react";
import "./Tracklist.css";
import Track from "../Track/Track"

function Tracklist(props) {

  const arrayToLoop = [...props.tracks];
    
    return (
      <div className="Tracklist">
      {arrayToLoop.map((element) => {
        return (
            <Track
            activeComp={props.activeComp} 
            track={element} 
            key={element.id}
            onAdd={props.onAdd}
            onRemove={props.onRemove}
            isRemoval={props.isRemoval} 
            />
            ); 
        })
      }
          
      </div>
  
    );
    
  };
  

  

  

export default Tracklist;
