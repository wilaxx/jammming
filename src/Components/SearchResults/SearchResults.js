import React from "react";
import "./SearchResults.css";
import Tracklist from "../Tracklist/Tracklist";

function SearchResults({searchResults}) {
  return (
    <div className="searchResults">
        <h2>Results for : </h2>
        <Tracklist tracklistResults={searchResults} />
    </div>
  );
}

export default SearchResults;
