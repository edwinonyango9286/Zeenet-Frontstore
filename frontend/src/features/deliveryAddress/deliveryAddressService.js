import { config } from "../../utils/axiosConfig";
import { newRequest } from "../../utils/newRequest";

const addDeliveryAddress = async (data) => {
  const response = await newRequest.post(
    `deliveryaddress/create`,
    data,
    config
  );
  if (response?.data) {
    return response.data;
  }
};

const getDeliveryAdddresses = async () => {
  const response = await newRequest.get(
    `deliveryaddress/getuserdeliveryaddresses`,
    config
  );
  if (response?.data) {
    return response?.data;
  }
};

const removeDeliveryAdddress = async (deliveryAddressId) => {
  const response = await newRequest.delete(
    `deliveryaddress/delete/${deliveryAddressId}`,
    config
  );
  if (response?.data) {
    return response?.data;
  }
};



const deliveryAddressService = {
  addDeliveryAddress,
  getDeliveryAdddresses,
  removeDeliveryAdddress,
};

export default deliveryAddressService;
