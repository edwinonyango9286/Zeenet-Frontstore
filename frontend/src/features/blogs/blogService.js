import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { newRequest } from "../../utils/newRequest";

const getAllBlogs = async () => {
  const response = await newRequest.get(`blog/getall`);
  return response.data
}

const getBlogs = async () => {
  const response = await axios.get(`${base_url}blog/getall`);
  return response.data;
};

const getBlog = async (id) => {
  const response = await axios.get(`${base_url}blog/get/${id}`);
  return response.data;
};
const blogService = {
  getBlogs,
  getBlog,
  getAllBlogs
};

export default blogService;
