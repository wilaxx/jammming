import "./Header.css";
import { Spotify } from "../../Utils/spotify";


function Header ({ isAuth }) {

    const handleLogin = () => {
        Spotify.authorize();
    };

    const handleLogout = () => {
        localStorage.clear();
    };


    const buttonRender = (auth) => {

        if(auth) {
            return (
                <button onClick={handleLogout}>
                    Log out
                 </button>
            );
        }
        else {
            return (

                <button onClick={handleLogin}>
                    Log in
                </button>  

            );
        }

    };

    return (

        <header className="Header">
            <div className="header-left">
            </div>
            
            <div className="header-center">
                <h1>Ja<span>mmm</span>ing</h1>
            </div>
            
            <div className="header-right">
            {buttonRender(isAuth)}
            </div>
                
        </header>

    );
};

export default Header;