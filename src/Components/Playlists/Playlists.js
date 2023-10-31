import React from "react";
import "./Playlists.css";

function Playlists (props) {

  let playlists = props.userPlaylists;


  return (
    <div className="Playlists">
        
      <nav className="panel">
          {playlists.map((element) => {
            return(
              <button key={element.uri} className="playlist"> {element.name}</button>
            );
          })}
      </nav>

      <section className="plToModify">
      <div className="plToModify">
        <ul>
          <li>#unfghhhhhhh</li>
          <li>#ungfhhhhh</li>
          <li>#unfghhhhh</li>
          <li>#unfghhhhh</li>
          <li>#ugfhhhhhhhn</li>
          <li>#gfhhhhhhhhun</li>
        </ul>
      </div>
        <aside className="itemsDeleted">
            <li>deleted 1</li>
            <li>deleted 2</li>        
        </aside>
      </section>

    </div>
  );
};

export default Playlists;
