import React, { useState } from "react";
import "./SearchBar.css";

function SearchBar(props) {

  const [word, setWord] = useState("");

  const handleChange = (event) => {
    setWord(event.target.value);

  };

  const handleClick = async () => {
    await props.onSearch(props.activeComp, word);
    setWord("");
  };


  return (
    <div className="SearchBar">
      <input
        value={word}
        onChange={handleChange}
        type="text"
        aria-label="Type song request here"
        placeholder="Type song here ..."
        id="search-input"
      />
      <button id="search-button" onClick={handleClick}>Search</button>
    </div>
  );
}

export default SearchBar;
