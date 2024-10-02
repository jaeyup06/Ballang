import axios from "axios";

export const apiAxios = axios.create({
  baseURL: "https://api.ballang.yoojinyoung.com/",
  withCredentials: true,
});
