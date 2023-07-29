import React from "react";
import "./SearchResults.css";
import Tracklist from "../Tracklist/Tracklist";

function SearchResults({searchResults}) {

  return (
    <div className="SearchResults">
        <h2>Results for : </h2>
        <Tracklist searchResults={searchResults} />
    </div>
  );
}

export default SearchResults;
