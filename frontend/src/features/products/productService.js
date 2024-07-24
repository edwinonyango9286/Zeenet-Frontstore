import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

const getProducts = async (data) => {
  const response = await axios.get(
    `${base_url}products/allproducts?${
      data?.brand ? `brand=${data?.brand}&&` : ""
    }${data?.tag ? `tags=${data?.tag}&&` : ""}${
      data?.category ? `category=${data?.category}&&` : ""
    }${data?.minPrice ? `price[gte]=${data?.minPrice}&&` : ""}${
      data?.maxPrice ? `price[lte]=${data?.maxPrice}&&` : ""
    }${data?.sort? `sort=${data?.sort}&&` : ""}`
  );
  return response.data;
};


const getASingleProduct = async (id) => {
  const response = await axios.get(`${base_url}products/getaproduct/${id}`);
  return response.data;
};

const addToWishlist = async (prodId) => {
  const response = await axios.put(
    `${base_url}products/addtowishlist`,
    {
      prodId,
    },
    config
  );
  if (response.data) {
    return response.data;
  }
};
const addRating = async (data) => {
  const response = await axios.put(`${base_url}products/rating`, data, config);
  if (response.data) {
    return response.data;
  }
};

const productService = {
  getProducts,
  addToWishlist,
  getASingleProduct,
  addRating,
};

export default productService;
