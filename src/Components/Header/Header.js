import "./Header.css";
import { useEffect, useRef } from "react";

function Header ({ isAuth, logIn, logOut }) {

    const handleLogin = async (event) => {
        event.stopPropagation();
        alert("You will be redirected to Spotify website to authenticate");
        await logIn();
        
    };
    const handleLogout = (event) => {
        event.stopPropagation();
        alert("You will be disconnected from Spotify");
        logOut();
        
    };


    const buttonRender = (auth) => {

        if(auth) {
            return (
                <button className="logout-btn" onClick={handleLogout}>
                    Log out
                 </button>
            );
        }
        else {
            return (

                <button className="login-btn" onClick={handleLogin}>
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