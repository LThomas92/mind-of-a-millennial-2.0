import axios from "axios";

export default axios.create({
  baseURL:
    "http://mindofmillennial.com" ||
    "https://boiling-beyond-67498.herokuapp.com" ||
    "https://localhost:5000",
  responseType: "json"
});
