import { newRequest } from "../../utils/newRequest";

const getCountries = async () => {
  const response = await newRequest.get(`country/getallcountries`);
  if (response?.data) {
    return response.data;
  }
};

const getCountry = async (id) => {
  const response = await newRequest.get(`country/get/${id}`);
  if (response?.data) {
    return response.data;
  }
};
const countryService = {
  getCountries,
  getCountry,
};

export default countryService;
