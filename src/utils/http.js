import axios from "axios";

const http = axios.create({
  timeout: 10000,
  headers: {"Content-Type": "application/json;charset=UTF-8"}
});

export default http;
