import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.ballang.yoojinyoung.com/auth",
  withCredentials: true,
});

export async function signUp(email: string, password: string) {
  const data = {
    email,
    password,
  };

  const response = await apiClient.post("/sign-up", data);
  return response.data.result;
}

export async function logIn(email: string, password: string) {
  const data = {
    email,
    password,
  };

  const response = await apiClient.post("/log-in", data);
  return response.data.result;
}

export async function logOut() {
  const response = await apiClient.delete("/log-out");
  return response.data.result;
}

export async function refreshToken() {
  const response = await apiClient.get("/refresh-token");
  return response.data.result;
}
