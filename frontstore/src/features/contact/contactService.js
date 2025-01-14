import { newRequest } from "../../utils/newRequest";

const postEnquiry = async (contactData) => {
  const response = await newRequest.post(`enquiry/create`, contactData);
  if (response?.data) {
    return response.data;
  }
};

const contactService = {
  postEnquiry,
};

export default contactService;
