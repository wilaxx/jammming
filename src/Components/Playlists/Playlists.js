import React from "react";
import "./Playlists.css";

function Playlists () {


  return (
    <div className="Playlists">
        
      <nav className="plNames">
        <ul>
          <button>un</button>
          <button>deux</button>
          <button>trois</button>
          <button>quatre</button>
          <button>cinq</button>
        </ul>
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
