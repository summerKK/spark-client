import axios from "axios";
import router from "../router";

const http = axios.create({
  timeout: 10000,
  headers: {"Content-Type": "application/json;charset=UTF-8"}
});

http.interceptors.response.use(response => {
    if (response.data.code === -1) {
      router.push({
        path: "/login",
        query: {redirect: router.history.current.name === "login" ? "" : router.currentRoute.fullPath}  //从哪个页面跳转
      })
    }
    return response;
  },
  error => {
    return Promise.reject(error.response.data)
  }
);

export default http;
