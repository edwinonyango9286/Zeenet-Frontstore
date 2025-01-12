import { newRequest } from "../../utils/newRequest";

const getCounties = async () => {
  const response = await newRequest.get(`county/getallcounties`);
  if (response?.data) {
    return response.data;
  }
};

const getCounty = async (id) => {
  const response = await newRequest.get(`county/get/${id}`);
  if (response?.data) {
    return response.data;
  }
};
const countyService = {
  getCounties,
  getCounty,
};

export default countyService;
