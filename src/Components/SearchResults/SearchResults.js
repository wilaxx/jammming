import React from "react";
import "./SearchResults.css";
import Tracklist from "../Tracklist/Tracklist";

function SearchResults(props) {

  // let compToLoad = props.activeComp;

  // const loadComp = (comp) => {

  //   if(comp === "create") {
  //     return (
  //           <Tracklist 
  //           tracks={tracksResultsOfCreate} 
  //           onAdd={onAdd} 
  //           />
  //     );
  //   }
  //   else if (comp === "modify") {
  //     return (
  //           <Tracklist 
  //           tracks={tracksResultsOfModify} 
  //           onAdd={onAdd} 
  //           />
  //     );
  //   }
  //   };


  return (

    <div className="SearchResults">
        <h2>Results : </h2>

        <Tracklist 
        tracks={props.tracksResults} 
        onAdd={props.onAdd}
        activeComp={props.activeComp} 
        />
    </div>
  );
}

export default SearchResults;


