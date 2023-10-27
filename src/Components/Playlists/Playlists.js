import React from "react";
import "./Playlists.css";

function Playlists() {
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
        <aside className="itemsDeleted">
            <li>deleted 1</li>
            <li>deleted 2</li>        
        </aside>
      </section>

    </div>
  );
}

export default Playlists;
