import "./AppSearch.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import { Suspense, lazy } from "react";

const Playlist = lazy(() => import ("../Playlist/Playlist"));


function AppSearch (props) {


    return (

        <div className="AppSearch">
          <SearchBar onSearch={props.onSearch} />
         
          <div className="AppSearch-results">
          
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

export default AppSearch;

