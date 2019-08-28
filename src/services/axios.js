import axios from "axios";
const url = "https://api.giphy.com/v1/gifs/";
const apiKey = "EUzSRkJo88fyanTPGTeEcuXOulKtgIwB";
screenLeft;
export default {
  getGifs: (limit, callback) => {
    const urlGif = url + "trending?apikey=" + apiKey + "&limit=" + limit;
    axios.get(urlGif).then(gifs => {
      if (callback) {
        callback(gifs);
      }
    });
  }
};
