import axios from "axios";

export async function getBrands() {
  const option = {
    url: "https://api.ballang.yoojinyoung.com/brands",
    method: "GET",
    withCredentials: true,
  };

  const response = await axios(option);
  return response.data.result;
}