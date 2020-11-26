import axios from "axios";

export default function AxiosAuth() {
  const token = JSON.parse(localStorage.getItem("token"));

  const instance = axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return instance;
}
