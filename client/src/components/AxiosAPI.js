import axios from "axios";

export default axios.create({
  baseURL:
    "https://mindofmillennial.com" ||
    "https://boiling-beyond-67498.herokuapp.com" ||
    "https://localhost:5000",
  responseType: "json"
});
