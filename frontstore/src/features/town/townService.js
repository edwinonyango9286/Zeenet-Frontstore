import { newRequest } from "../../utils/newRequest";

const getTowns = async () => {
  const response = await newRequest.get(`town/getalltowns`);
  if (response?.data) {
    return response.data;
  }
};

const getTown = async (id) => {
  const response = await newRequest.get(`town/get/${id}`);
  if (response?.data) {
    return response.data;
  }
};


const townService = {
  getTown,
  getTowns,
};

export default townService;
