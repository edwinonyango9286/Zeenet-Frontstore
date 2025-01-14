import { newRequest } from "../../utils/newRequest";

const getDeliveryStations = async () => {
  const response = await newRequest.get(
    `deliverystation/getalldeliverystations`
  );
  if (response?.data) {
    return response.data;
  }
};

const getDeliveryStation = async (id) => {
  const response = await newRequest.get(`deliverystation/get/${id}`);
  if (response?.data) {
    return response.data;
  }
};
const deliveryStationService = {
  getDeliveryStations,
  getDeliveryStation,
};

export default deliveryStationService;
