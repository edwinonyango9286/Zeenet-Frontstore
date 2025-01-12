import axios from "axios";

export const newRequest = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 15000,
  withCredentials: true,
});
