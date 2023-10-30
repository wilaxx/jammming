import React from "react";
import "./ModifyPlaylist.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlists from "../Playlists/Playlists";


function ModifyPlaylist (props) {

  return (

    <div className="ModifyPlaylist">

      <Playlists
      activeComp={props.activeComp}
      onRemove={props.onRemove}
      tracks={props.tracksPlaylistOfModify}
      onNameChange={props.onNameChange}
      onSave={props.onSave}

       />
      
      <article className="addSongs">
        <SearchBar onSearch={props.onSearch} activeComp={props.activeComp} />
        <SearchResults activeComp={props.activeComp} tracksResults={props.tracksResultsOfModify} onAdd={props.onAdd} />
      </article>

    </div>
  );
};

export default ModifyPlaylist;
