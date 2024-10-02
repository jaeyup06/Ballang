import { apiAxios } from "./api";

export async function getBrands() {
  const data = {
    method: "GET",
    withCredentials: true,
  };

  const response = await apiAxios("/brands", data);
  return response.data.result;
}
