import React from "react";
import "./ModifyPlaylist.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlists from "../Playlists/Playlists";


function ModifyPlaylist(props) {


  return (

    <div className="ModifyPlaylist">

      <Playlists
      // onRemove={props.onRemove}
       />
          
      <article className="addSongs">
        <SearchBar onSearch={props.onSearch} />
      </article>

    </div>
  );
};

export default ModifyPlaylist;
