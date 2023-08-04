// import { v4 as uuidv4 } from "uuid";
const { v4: uuidv4 } = require('uuid');

const generateId = () => {
    //Doesn't work if you dont use certificate (to use HTTPS)
    let uuid = uuidv4();
    return uuid;
  };
const genURI = (array) => {
    const urisToGen = [...array];
    return urisToGen.map((element) => `spotify:tracks:${element.id}`);
  };
  

    const addedArrays = [...keny, ...tsr,]
    const dbSongs = [];


  export { dbSongs as database };