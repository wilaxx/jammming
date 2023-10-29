import "./CreatePlaylist.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import { Suspense } from "react";




function CreatePlaylist (props) {


    return (

        <div className="CreatePlaylist">
          <SearchBar onSearchOfCreate={props.onSearchOfCreate} />
         
          <div className="CreatePlaylist-results">
          
          <SearchResults tracksResultsOfCreate={props.tracksResultsOfCreate} onAdd={props.onAdd} />
          
          <Suspense fallback={<h1> HELLO </h1>}>
          <Playlist 
          onRemoveOfCreate={props.onRemoveOfCreate} 
          tracksPlaylistOfCreate={props.tracksPlaylistOfCreate} 
          namePlaylistOfCreate={props.namePlaylistOfCreate} 
          onNameChangeOfCreate={props.onNameChangeOfCreate} 
          onSaveOfCreate={props.onSaveOfCreate} />
          </Suspense>
          </div>
      </div>

    );
};

export default CreatePlaylist;

