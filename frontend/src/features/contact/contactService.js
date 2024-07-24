import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const postEnquiry = async (contactData) => {
  const response = await axios.post(`${base_url}enquiry/create`, contactData);
  return response.data;
};

const contactService = {
  postEnquiry,
};

export default contactService;
