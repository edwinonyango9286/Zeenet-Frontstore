import axios from "axios";
import { newRequest } from "../../utils/newRequest";

const postEnquiry = async (contactData) => {
  const response = await newRequest.post(`enquiry/create`, contactData);
  return response.data;
};

const contactService = {
  postEnquiry,
};

export default contactService;
