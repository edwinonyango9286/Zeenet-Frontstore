import { base_url } from "./baseUrl";
import axios from "axios";

export const newRequest = axios.create({
  baseURL: base_url,
  withCredentials: true,
})