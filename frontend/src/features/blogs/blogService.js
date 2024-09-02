import { newRequest } from "../../utils/newRequest";

const getBlogs = async () => {
  const response = await newRequest.get(`blog/getall`);
  return response.data;
};

const getBlog = async (id) => {
  const response = await newRequest.get(`blog/get/${id}`);
  return response.data;
};
const blogService = {
  getBlogs,
  getBlog,
};

export default blogService;
