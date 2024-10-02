import { apiAxios } from "./api";

export async function signUp(email: string, password: string) {
  const data = {
    email,
    password,
  };

  const response = await apiAxios.post("/auth/sign-up", data);
  return response.data.result;
}

export async function logIn(email: string, password: string) {
  const data = {
    email,
    password,
  };

  const response = await apiAxios.post("/auth/log-in", data);
  return response.data.result;
}

export async function logOut() {
  const response = await apiAxios.delete("/auth/log-out");
  return response.data.result;
}

export async function refreshToken() {
  const response = await apiAxios.get("/auth/refresh-token");
  return response.data.result;
}
