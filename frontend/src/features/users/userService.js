import { newRequest } from "../../utils/newRequest";
import { config } from "../../utils/axiosConfig";
import Cookies from "js-cookie";

const register = async (userData) => {
  const response = await newRequest.post(`user/register`, userData);
  if (response?.data) {
    return response.data;
  }
};

const signin = async (userData) => {
  const response = await newRequest.post(`user/signin`, userData);
  if (response?.data) {
    return response.data;
  }
};

const logoutAUser = async () => {
  const response = await newRequest.get(`user/logout`);
  if (response?.data) {
    return response.data;
  }
};

const getUserWishlist = async () => {
  const response = await newRequest.get(`user/get-user-wishlist`, config);
  if (response?.data) {
    return response.data;
  }
};

const addToCart = async (cartData) => {
  const token = Cookies.get("token");
  if (token) {
    const response = await newRequest.post(`user/cart`, cartData, config);
    if (response?.data) {
      localStorage.removeItem("userCart");
      return response.data;
    }
  } else {
    return cartData;
  }
};

const getCart = async (data) => {
  const response = await newRequest.get(`user/getusercart`, data, config);
  if (response?.data) {
    return response.data;
  }
};

const userCheckout = async (paymentInfo) => {
  const response = await newRequest.post(
    "/payment/stk-push",
    paymentInfo,
    config
  );
  if (response?.data) {
    return response.data;
  }
};
const updateUserProfile = async (data) => {
  const response = await newRequest.put(`user/update-user`, data?.data, config);
  if (response?.data) {
    return response.data;
  }
};

const forgotPasswordToken = async (data) => {
  const response = await newRequest.post(`user/forgot-password-token`, data);
  if (response?.data) {
    return response.data;
  }
};

const resetUserPassword = async (data) => {
  const response = await newRequest.put(`user/reset-password/${data?.token}`, {
    password: data.password,
  });
  if (response?.data) {
    return response.data;
  }
};

const getUserOrders = async () => {
  const response = await newRequest.get(`user/getmyorders`, config);
  if (response?.data) {
    return response.data;
  }
};

const userService = {
  register,
  signin,
  logoutAUser,
  getUserWishlist,
  addToCart,
  getCart,
  updateUserProfile,
  forgotPasswordToken,
  resetUserPassword,
  getUserOrders,
  userCheckout,
};

export default userService;
