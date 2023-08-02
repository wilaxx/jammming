import React from "react";
import "./Tracklist.css";
import Track from "../Track/Track"

function Tracklist({ onAdd, onRemove, isRemoval, tracks }) {
  
  const arrayToLoop = [...tracks];
  console.log(arrayToLoop);
    
    return (
      <div className="Tracklist">
      {arrayToLoop.map((element) => {
        return (
            <Track 
            track={element} 
            key={element.id}
            onAdd={onAdd}
            onRemove={onRemove}
            isRemoval={isRemoval} 
            />
            ); 
        })
      }
          
      </div>
  
    );
    
        };
  

  

  

export default Tracklist;
