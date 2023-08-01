import React from "react";
import "./SearchResults.css";
import Tracklist from "../Tracklist/Tracklist";

function SearchResults({ tracksResults, onAdd }) {

  return (
    <div className="SearchResults">
        <h2>Results for : </h2>
        <Tracklist tracks={tracksResults} action={onAdd} />
    </div>
  );
}

export default SearchResults;
