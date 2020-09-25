import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5001/kitchen-love-37aba/us-central1/api",
});

export default instance;
