import axios from "axios";

export async function signUp(email: string, password: string) {
  const data = {
    email,
    password,
  };

  const response = await axios.post(
    "https://api.ballang.yoojinyoung.com/auth/sign-up",
    data
  );
  return response.data.result;
}

export async function logIn(email: string, password: string) {
  const data = {
    email,
    password,
  };

  const response = await axios.post(
    "https://api.ballang.yoojinyoung.com/auth/log-in",
    data
  );
  return response.data.result;
}
