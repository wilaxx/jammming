import React, { useState } from "react";
import "./SearchBar.css";

function SearchBar({onSearch}) {
  
  const [word, setWord] = useState("");

  const handleChange = (event) => {
    setWord(event.target.value);

  };

  const handleClick = () => {
    onSearch(word);
  };


  return (
    <div className="SearchBar">
      <input
        value={word}
        onChange={handleChange}
        type="text"
        aria-label="Type song request here"
        placeholder="Type song here ..."
      />
      <button id="search-button" onClick={handleClick}>Search</button>
    </div>
  );
}

export default SearchBar;
