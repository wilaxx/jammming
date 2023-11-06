import "./CreatePlaylist.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import { Suspense } from "react";




function CreatePlaylist (props) {


  
    return (

        <div className="CreatePlaylist">
          <SearchBar onSearch={props.onSearch} activeComp={props.activeComp} />
         
          <div className="CreatePlaylist-results">
          
          <SearchResults activeComp={props.activeComp} tracksResults={props.tracksResultsOfCreate} onAdd={props.onAdd} />
          
          <Suspense fallback={<h1> HELLO </h1>}>
          <Playlist
          activeComp={props.activeComp} 
          onRemove={props.onRemove} 
          tracks={props.tracksPlaylistOfCreate} 
          name={props.namePlaylistOfCreate} 
          onNameChange={props.onNameChange} 
          onSave={props.onSave} />
          </Suspense>
          </div>
      </div>

    );
};

export default CreatePlaylist;

