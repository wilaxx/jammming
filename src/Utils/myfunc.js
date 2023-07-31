function timer(time){

  function sleepFor(sleepDuration){
    let now = new Date().getTime();
    while(new Date().getTime() < (now + sleepDuration)){  
    }
}

    sleepFor(time);
    console.log("Hello, JavaScript sleep!");
};


function sleep(milliseconds) {
  let start = new Date().getTime();
  for (let i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

export { timer, sleep };