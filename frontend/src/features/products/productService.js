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
  if (response?.data) {
    return response.data;
  }
};

const getProduct = async (id) => {
  const response = await newRequest.get(`products/getaproduct/${id}`);
  if (response?.data) {
    return response.data;
  }
};

const addToWishlist = async (productId) => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const config = {
    headers: {
      Authorization: `Bearer ${user !== null ? user.token : ""}`,
      Accept: "application/json",
    },
    withCredentials: true,
  };
  const response = await newRequest.put(
    `products/addtowishlist`,
    {
      productId,
    },
    config
  );
  if (response?.data) {
    return response.data;
  }
};

const removeFromWishlist = async (productId) => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const config = {
    headers: {
      Authorization: `Bearer ${user !== null ? user.token : ""}`,
      Accept: "application/json",
    },
    withCredentials: true,
  };
  const response = await newRequest.put(
    `products/addtowishlist`,
    {
      productId,
    },
    config
  );
  if (response?.data) {
    return response.data;
  }
};
const addRating = async (data) => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const config = {
    headers: {
      Authorization: `Bearer ${user !== null ? user.token : ""}`,
      Accept: "application/json",
    },
    withCredentials: true,
  };
  const response = await newRequest.put(`products/rating`, data, config);
  if (response?.data) {
    return response.data;
  }
};

const productService = {
  getProducts,
  addToWishlist,
  getProduct,
  addRating,
  removeFromWishlist,
};

export default productService;
