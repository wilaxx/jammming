import React from "react";
import "./SearchBar.css";

function SearchBar() {
  
  return (
    <div className="SearchBar">
      <input
        type="text"
        aria-label="Type song request here"
        placeholder="Type song here ..."
      />
      <button>Search</button>
    </div>
  );
}

export default SearchBar;
