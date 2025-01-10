import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import userService from "./userService";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export const registerUser = createAsyncThunk(
  "auth/user-register",
  async (userData, thunkAPI) => {
    try {
      return await userService.register(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const signinUser = createAsyncThunk(
  "auth/user-signin",
  async (userData, thunkAPI) => {
    try {
      return await userService.signin(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/user-logout",
  async (thunkAPI) => {
    try {
      return await userService.logoutAUser();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserProductWishlist = createAsyncThunk(
  "user/get-user-wishlist",
  async (thunkAPI) => {
    try {
      return await userService.getUserWishlist();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addProductToCart = createAsyncThunk(
  "user/add-product-to-cart",
  async (cartData, thunkAPI) => {
    try {
      const userCart = JSON.parse(localStorage.getItem("userCart")) || [];
      const index = userCart.findIndex(
        (item) => item.productId === cartData.productId
      );
      if (index === -1) {
        userCart.push({ ...cartData, quantity: 1 });
      } else {
        userCart[index].quantity += 1;
        cartData.quantity = userCart[index].quantity;
      }
      localStorage.setItem("userCart", JSON.stringify(userCart));
      return userCart;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const removeProductFromCart = createAsyncThunk(
  "user/remove-product-from-cart",
  async (productId, thunkAPI) => {
    try {
      let userCart = JSON.parse(localStorage.getItem("userCart")) || [];
      userCart = userCart.filter((item) => item?.productId !== productId);
      localStorage.setItem("userCart", JSON.stringify(userCart));
      return userCart;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateProductQuantity = createAsyncThunk(
  "user/update-product-quantity",
  async ({ productId, newQuantity }, thunkAPI) => {
    try {
      const userCart = JSON.parse(localStorage.getItem("userCart")) || [];
      const index = userCart.findIndex((item) => item.productId === productId);
      if (index !== -1) {
        userCart[index].quantity = newQuantity;
        localStorage.setItem("userCart", JSON.stringify(userCart));
        return userCart;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserCart = createAsyncThunk(
  "user/get-user-cart",
  async (data, thunkAPI) => {
    try {
      return await userService.getCart(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const clearUserCart = createAsyncThunk(
  "user/clear-user-cart",
  async (thunkAPI) => {
    try {
      localStorage.removeItem("userCart");
      return [];
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const checkout = createAsyncThunk(
  "user/checkout",
  async (paymentInfo, thunkAPI) => {
    try {
      return await userService.userCheckout(paymentInfo);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user/update-profile",
  async (data, thunkAPI) => {
    try {
      return await userService.updateUserProfile(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetUserPasswordToken = createAsyncThunk(
  "user/reset-password-token",
  async (data, thunkAPI) => {
    try {
      return await userService.resetPasswordToken(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/reset-password",
  async (data, thunkAPI) => {
    try {
      return await userService.resetUserPassword(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOrders = createAsyncThunk(
  "user/get-orders",
  async (data, thunkAPI) => {
    try {
      return await userService.getUserOrders(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addADeliveryAddress = createAsyncThunk(
  "user/add-a-orders",
  async (data, thunkAPI) => {
    try {
      return await userService.addDeliveryAddress(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  createdUser: null,
  user: null,
  userCart: localStorage.getItem("userCart")
    ? JSON.parse(localStorage.getItem("userCart"))
    : [],
  resetToken: null,
  isError: {
    registerUser: false,
    signinUser: false,
    logoutUser: false,
    checkout: false,
    addProductToCart: false,
    removeProductFromCart: false,
    updateProductQuantity: false,
    clearUserCart: false,
    getUserCart: false,
    getOrders: false,
    updateProfile: false,
    resetUserPasswordToken: false,
    resetPassword: false,
    getUserProductWishlist: false,
    getAccessToken: false,
    addADeliveryAddress: false,
  },
  isLoading: {
    registerUser: false,
    signinUser: false,
    logoutUser: false,
    checkout: false,
    addProductToCart: false,
    removeProductFromCart: false,
    updateProductQuantity: false,
    clearUserCart: false,
    getUserCart: false,
    getOrders: false,
    updateProfile: false,
    resetUserPasswordToken: false,
    resetPassword: false,
    getUserProductWishlist: false,
    addADeliveryAddress: false,
  },
  isSuccess: {
    registerUser: false,
    signinUser: false,
    logoutUser: false,
    checkout: false,
    addProductToCart: false,
    removeProductFromCart: false,
    updateProductQuantity: false,
    clearUserCart: false,
    getUserCart: false,
    getOrders: false,
    updateProfile: false,
    resetUserPasswordToken: false,
    resetPassword: false,
    getUserProductWishlist: false,
    addADeliveryAddress: false,
  },
  message: "",
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading.registerUser = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isError.registerUser = false;
        state.isLoading.registerUser = false;
        state.isSuccess.registerUser = true;
        state.createdUser = action?.payload;
        toast.success("Account created successfully.");
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isError.registerUser = true;
        state.isSuccess.registerUser = false;
        state.isLoading.registerUser = false;
        state.message = action?.payload?.response?.data?.message;
        if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "It seems there’s an issue at the moment. Please try again later."
          );
        }
      })
      .addCase(signinUser.pending, (state) => {
        state.isLoading.signinUser = true;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.isError.signinUser = false;
        state.isLoading.signinUser = false;
        state.isSuccess.signinUser = true;
        state.user = action?.payload;
        Cookies.set("firstName", action?.payload?.firstName, {
          expires: 1,
          secure: true,
          sameSite: "Strict",
        });
        Cookies.set("email", action?.payload?.email, {
          expires: 1,
          secure: true,
          sameSite: "Strict",
        });
        Cookies.set("phoneNumber", action?.payload?.phoneNumber, {
          expires: 1,
          secure: true,
          sameSite: "Strict",
        });
        Cookies.set("avatar", action?.payload?.avatar, {
          expires: 1,
          secure: true,
          sameSite: "Strict",
        });
        Cookies.set("accessToken", action?.payload?.accessToken, {
          expires: 1,
          secure: true,
          sameSite: "Strict",
        });
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.isError.signinUser = true;
        state.isSuccess.signinUser = false;
        state.isLoading.signinUser = false;
        state.message = action?.payload?.response?.data?.message;
        if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "It seems there’s an issue at the moment. Please try again later."
          );
        }
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading.logoutUser = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isError.logoutUser = false;
        state.isLoading.logoutUser = false;
        state.isSuccess.logoutUser = true;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isError.logoutUser = true;
        state.isSuccess.logoutUser = false;
        state.isLoading.logoutUser = false;
        state.message = action?.payload?.response?.data?.message;
        if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "It seems there’s an issue at the moment. Please try again later."
          );
        }
      })
      .addCase(addProductToCart.pending, (state) => {
        state.isLoading.addProductToCart = true;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.isError.addProductToCart = false;
        state.isLoading.addProductToCart = false;
        state.isSuccess.addProductToCart = true;
        state.userCart = action?.payload;
        localStorage.setItem("userCart", JSON.stringify(action?.payload));
        toast.success("Product added to cart.");
      })
      .addCase(addProductToCart.rejected, (state, action) => {
        state.isError.addProductToCart = true;
        state.isSuccess.addProductToCart = false;
        state.isLoading.addProductToCart = false;
        state.message = action?.payload?.response?.data?.message;
        if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "It seems there’s an issue at the moment. Please try again later."
          );
        }
      })
      .addCase(removeProductFromCart.pending, (state) => {
        state.isLoading.removeProductFromCart = true;
      })
      .addCase(removeProductFromCart.fulfilled, (state, action) => {
        state.isError.removeProductFromCart = false;
        state.isLoading.removeProductFromCart = false;
        state.isSuccess.removeProductFromCart = true;
        state.userCart = action?.payload;
        localStorage.setItem("userCart", JSON.stringify(action?.payload));
      })
      .addCase(removeProductFromCart.rejected, (state, action) => {
        state.isError.removeProductFromCart = true;
        state.isSuccess.removeProductFromCart = false;
        state.isLoading.removeProductFromCart = false;
        state.message = action?.payload?.response?.data?.message;
        if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "It seems there’s an issue at the moment. Please try again later."
          );
        }
      })

      .addCase(updateProductQuantity.pending, (state) => {
        state.isLoading.updateProductQuantity = true;
      })
      .addCase(updateProductQuantity.fulfilled, (state, action) => {
        state.isError.updateProductQuantity = false;
        state.isLoading.updateProductQuantity = false;
        state.isSuccess.updateProductQuantity = true;
        state.userCart = action?.payload;
        localStorage.setItem("userCart", JSON.stringify(action?.payload));
      })
      .addCase(updateProductQuantity.rejected, (state, action) => {
        state.isError.updateProductQuantity = true;
        state.isSuccess.updateProductQuantity = false;
        state.isLoading.updateProductQuantity = false;
        state.message = action?.payload?.response?.data?.message;
        if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "It seems there’s an issue at the moment. Please try again later."
          );
        }
      })

      .addCase(clearUserCart.pending, (state) => {
        state.isLoading.clearUserCart = true;
      })
      .addCase(clearUserCart.fulfilled, (state, action) => {
        state.isError.clearUserCart = false;
        state.isLoading.clearUserCart = false;
        state.isSuccess.clearUserCart = true;
        state.userCart = [];
      })
      .addCase(clearUserCart.rejected, (state, action) => {
        state.isError.clearUserCart = true;
        state.isSuccess.clearUserCart = false;
        state.isLoading.clearUserCart = false;
        state.message = action?.payload?.response?.data?.message;
        if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "It seems there’s an issue at the moment. Please try again later."
          );
        }
      })
      .addCase(getUserProductWishlist.pending, (state) => {
        state.isLoading.getUserProductWishlist = true;
      })
      .addCase(getUserProductWishlist.fulfilled, (state, action) => {
        state.isError.getUserProductWishlist = false;
        state.isLoading.getUserProductWishlist = false;
        state.isSuccess.getUserProductWishlist = true;
        state.wishlistProducts = action?.payload;
      })
      .addCase(getUserProductWishlist.rejected, (state, action) => {
        state.isError.getUserProductWishlist = true;
        state.isSuccess.getUserProductWishlist = false;
        state.isLoading.getUserProductWishlist = false;
        state.message = action?.payload?.response?.data?.message;
        if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "It seems there’s an issue at the moment. Please try again later."
          );
        }
      })
      .addCase(getUserCart.pending, (state) => {
        state.isLoading.getUserCart = true;
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.isError.getUserCart = false;
        state.isLoading.getUserCart = false;
        state.isSuccess.getUserCart = true;
        state.cartProducts = action?.payload;
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.isError.getUserCart = true;
        state.isSuccess.getUserCart = false;
        state.isLoading.getUserCart = false;
        state.message = action?.payload?.response?.data?.message;
        if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "It seems there’s an issue at the moment. Please try again later."
          );
        }
      })
      .addCase(checkout.pending, (state) => {
        state.isLoading.checkout = true;
      })
      .addCase(checkout.fulfilled, (state, action) => {
        state.isError.checkout = false;
        state.isLoading.checkout = false;
        state.isSuccess.checkout = true;
        state.paymentStatus = action?.payload;
      })
      .addCase(checkout.rejected, (state, action) => {
        state.isError.checkout = true;
        state.isSuccess.checkout = false;
        state.isLoading.checkout = false;
        state.message = action?.payload?.response?.data?.message;
        if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "It seems there’s an issue at the moment. Please try again later."
          );
        }
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading.updateProfile = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isError.updateProfile = false;
        state.isLoading.updateProfile = false;
        state.isSuccess.updateProfile = true;
        state.updatedUser = action?.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isError.updateProfile = true;
        state.isSuccess.updateProfile = false;
        state.isLoading.updateProfile = false;
        state.message = action?.payload?.response?.data?.message;
        if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "It seems there’s an issue at the moment. Please try again later."
          );
        }
      })

      .addCase(resetUserPasswordToken.pending, (state) => {
        state.isLoading.resetUserPasswordToken = true;
      })
      .addCase(resetUserPasswordToken.fulfilled, (state, action) => {
        state.isError.resetUserPasswordToken = false;
        state.isLoading.resetUserPasswordToken = false;
        state.isSuccess.resetUserPasswordToken = true;
        state.message = action?.payload?.message;
        toast.success(action?.payload?.message);
      })
      .addCase(resetUserPasswordToken.rejected, (state, action) => {
        state.isError.resetUserPasswordToken = true;
        state.isSuccess.resetUserPasswordToken = false;
        state.isLoading.resetUserPasswordToken = false;
        state.message = action?.payload?.response?.data?.message;
        if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "It seems there’s an issue at the moment. Please try again later."
          );
        }
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading.resetPassword = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isError.resetPassword = false;
        state.isLoading.resetPassword = false;
        state.isSuccess.resetPassword = true;
        state.newPassword = action?.payload;
        toast.success("Your password has been updated. Proceed to signin.");
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isError.resetPassword = true;
        state.isSuccess.resetPassword = false;
        state.isLoading.resetPassword = false;
        state.message = action?.payload?.response?.data?.message;
        if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "It seems there’s an issue at the moment. Please try again later."
          );
        }
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading.getOrders = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isError.getOrders = false;
        state.isLoading.getOrders = false;
        state.isSuccess.getOrders = true;
        state.orderedProducts = action?.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isError.getOrders = true;
        state.isSuccess.getOrders = false;
        state.isLoading.getOrders = false;
        state.message = action?.payload?.response?.data?.message;
        if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "It seems there’s an issue at the moment. Please try again later."
          );
        }
      })
      .addCase(addADeliveryAddress.pending, (state) => {
        state.isLoading.addADeliveryAddress = true;
      })
      .addCase(addADeliveryAddress.fulfilled, (state, action) => {
        state.isError.addADeliveryAddress = false;
        state.isLoading.addADeliveryAddress = false;
        state.isSuccess.addADeliveryAddress = true;
        state.deliveryAddress = action?.payload;
      })
      .addCase(addADeliveryAddress.rejected, (state, action) => {
        state.isError.addADeliveryAddress = true;
        state.isSuccess.addADeliveryAddress = false;
        state.isLoading.addADeliveryAddress = false;
        state.message = action?.payload?.response?.data?.message;
        if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "It seems there’s an issue at the moment. Please try again later."
          );
        }
      })
      .addCase(resetState, () => initialState);
  },
});

export default authSlice.reducer;
