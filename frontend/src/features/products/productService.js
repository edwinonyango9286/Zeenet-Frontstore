import { config } from "../../utils/axiosConfig";
import { newRequest } from "../../utils/newRequest";

const getProducts = async (data) => {
  const response = await newRequest.get(
    `products/allproducts?${data?.brand ? `brand=${data?.brand}&&` : ""}${
      data?.tag ? `tags=${data?.tag}&&` : ""
    }${data?.category ? `category=${data?.category}&&` : ""}${
      data?.minPrice ? `price[gte]=${data?.minPrice}&&` : ""
    }${data?.maxPrice ? `price[lte]=${data?.maxPrice}&&` : ""}${
      data?.sort ? `sort=${data?.sort}&&` : ""
    }`
  );
  return response.data;
};

const getASingleProduct = async (id) => {
  const response = await newRequest.get(`products/getaproduct/${id}`);
  return response.data;
};

const addToWishlist = async (prodId) => {
  const response = await newRequest.put(
    `products/addtowishlist`,
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
  const response = await newRequest.put(`products/rating`, data, config);
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
