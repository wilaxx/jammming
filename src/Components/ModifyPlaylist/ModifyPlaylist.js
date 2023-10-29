import React from "react";
import "./ModifyPlaylist.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlists from "../Playlists/Playlists";


function ModifyPlaylist (props) {

  return (

    <div className="ModifyPlaylist">

      <Playlists
      onRemoveOfModify={props.onRemoveOfModify}
       />
      
      <article className="addSongs">
        <SearchBar onSearchOfModify={props.onSearchOfModify} />
        <SearchResults tracksResultsOfModify={props.tracksResultsOfModify} onAddOfModify={props.onAddOfModify} />
      </article>

    </div>
  );
};

export default ModifyPlaylist;
