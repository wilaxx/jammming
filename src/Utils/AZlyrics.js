import ReactDOM from 'react-dom';
import { useState, Suspense, lazy } from "react";

const keny_url= "https://www.azlyrics.com/k/kenyarkana.html"
// const user_agent= 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'

async function gethttp(url) {
    const response = await fetch(url);
    const responseToText = await response.text();
    return responseToText;
  };

    let document = gethttp(keny_url);
    let titre = document.getElementById("85529");


function AZlyrics() {
  

  return (
    {ReactDOM.render(titre)}
    <div className="AZlyrics">
        
    {titre}
    </div>
  );
  };

export default AZlyrics;
