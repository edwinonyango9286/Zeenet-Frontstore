import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosConfig";

const register = async (userData) => {
  const response = await axios.post(`${base_url}user/register`, userData);
  if (response.data) {
    localStorage.setItem("customer", JSON.stringify(response.data));
  }

  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${base_url}user/login`, userData);
  if (response.data) {
    localStorage.setItem("customer", JSON.stringify(response.data));
  }
  return response.data;
};

const logoutAUser = async () => {
  const response = await axios.get(`${base_url}user/logout`);
  localStorage.removeItem("customer");
  localStorage.removeItem("token");
  return response.data;
};


const getUserWishlist = async () => {
  const response = await axios.get(`${base_url}user/wishlist`, config);
  if (response.data) {
    return response.data;
  }
};

const addToCart = async (cartData) => {
  if (localStorage.getItem("customer")) {
    const response = await axios.post(`${base_url}user/cart`, cartData, config);
    if (response.data) {
      localStorage.removeItem("userCart");
      return response.data;
    }
  } else {
    return cartData;
  }
};

const getCart = async (data) => {
  const response = await axios.get(`${base_url}user/getusercart`, data);
  if (response.data) {
    return response.data;
  }
};

const updateUserProfile = async (data) => {
  const response = await axios.put(
    `${base_url}user/update-user`,
    data?.data,
    data?.config2
  );
  if (response.data) {
    return response.data;
  }
};

const forgotPasswordToken = async (data) => {
  const response = await axios.post(
    `${base_url}user/forgot-password-token`,
    data
  );
  if (response.data) {
    return response.data;
  }
};

const resetUserPassword = async (data) => {
  const response = await axios.put(
    `${base_url}user/reset-password/${data?.token}`,
    { password: data?.password }
  );
  if (response.data) {
    return response.data;
  }
};

const getUserOrders = async (data) => {
  const response = await axios.get(`${base_url}user/getmyorders/`, data);
  if (response.data) {
    return response.data;
  }
};

const authService = {
  register,
  login,
  logoutAUser,
  getUserWishlist,
  addToCart,
  getCart,
  updateUserProfile,
  forgotPasswordToken,
  resetUserPassword,
  getUserOrders,
};

export default authService;
