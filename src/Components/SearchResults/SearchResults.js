import React from "react";
import "./SearchResults.css";
import Tracklist from "../Tracklist/Tracklist";

function SearchResults({ tracksResultsOfCreate, onAdd }) {

  return (
    <div className="SearchResults">
        <h2>Results : </h2>
        <Tracklist 
        tracks={tracksResultsOfCreate} 
        onAdd={onAdd} 
        />
    </div>
  );
}

export default SearchResults;
