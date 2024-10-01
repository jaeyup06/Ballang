import axios from "axios";

export async function getProducts() {
  const option = {
    url: "https://api.ballang.yoojinyoung.com/products",
    method: "GET",
    withCredentials: true,
  };

  const response = await axios(option);
  return response.data.result;
}