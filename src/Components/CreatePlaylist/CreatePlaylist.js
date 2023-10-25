import "./CreatePlaylist.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import { Suspense } from "react";




function CreatePlaylist (props) {


    return (

        <div className="CreatePlaylist">
          <SearchBar onSearch={props.onSearch} />
         
          <div className="CreatePlaylist-results">
          
          <SearchResults tracksResults={props.tracksResults} onAdd={props.onAdd} />
          
          <Suspense fallback={<h1> HELLO </h1>}>
          <Playlist 
          onRemove={props.onRemove} 
          tracksPlaylist={props.tracksPlaylist} 
          namePlaylist={props.namePlaylist} 
          onNameChange={props.onNameChange} 
          onSave={props.onSave} />
          </Suspense>
          </div>
      </div>

    );
};

export default CreatePlaylist;

