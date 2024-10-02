import { apiAxios } from "./api";

export async function getProducts() {
  const data = {
    method: "GET",
    withCredentials: true,
  };

  const response = await apiAxios("/products", data);
  return response.data.result;
}
