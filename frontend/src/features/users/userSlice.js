import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import userService from "./userService";
import { toast } from "react-toastify";

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

export const loginUser = createAsyncThunk(
  "auth/user-login",
  async (userData, thunkAPI) => {
    try {
      return await userService.login(userData);
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

export const placeUserOrder = createAsyncThunk(
  "user/place-order",
  async (paymentInfo, thunkAPI) => {
    try {
      return await userService.placeOrder(paymentInfo);
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

export const resetPasswordToken = createAsyncThunk(
  "user/reset-password-token",
  async (data, thunkAPI) => {
    try {
      return await userService.forgotPasswordToken(data);
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

export const resetState = createAction("Reset_all");

const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  user: user,
  userCart: localStorage.getItem("userCart")
    ? JSON.parse(localStorage.getItem("userCart"))
    : [],
  isError: false,
  isLoading: {
    registerUser: false,
    loginUser: false,
    logoutUser: false,
    getOrders: false,
    resetPasswordToken: false,
    resetPassword: false,
    getUserProductWishlist: false,
  },
  isSuccess: false,
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
        state.isError = false;
        state.isLoading.registerUser = false;
        state.isSuccess = true;
        state.createdUser = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading.registerUser = false;
        state.message = action?.payload?.response?.data?.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading.loginUser = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading.loginUser = false;
        state.isSuccess = true;
        state.user = action.payload;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading.loginUser = false;
        state.message = action?.payload?.response?.data?.message;
      })

      .addCase(logoutUser.pending, (state) => {
        state.isLoading.logoutUser = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading.logoutUser = false;
        state.isSuccess = true;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading.logoutUser = false;
        state.message = action.error;
      })

      .addCase(addProductToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.userCart = action.payload;
        localStorage.setItem("userCart", JSON.stringify(action.payload));
      })
      .addCase(addProductToCart.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })
      .addCase(removeProductFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeProductFromCart.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.userCart = action.payload;
        localStorage.setItem("userCart", JSON.stringify(action.payload));
      })
      .addCase(removeProductFromCart.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })

      .addCase(updateProductQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProductQuantity.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.userCart = action.payload;
        localStorage.setItem("userCart", JSON.stringify(action.payload));
      })
      .addCase(updateProductQuantity.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload;
      })

      .addCase(clearUserCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(clearUserCart.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.userCart = [];
      })
      .addCase(clearUserCart.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(getUserProductWishlist.pending, (state) => {
        state.isLoading.getUserProductWishlist = true;
      })
      .addCase(getUserProductWishlist.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading.getUserProductWishlist = false;
        state.isSuccess = true;
        state.wishlistProducts = action.payload;
      })
      .addCase(getUserProductWishlist.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading.getUserProductWishlist = false;
        state.message = action.error;
      })
      .addCase(getUserCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.cartProducts = action.payload;
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action?.payload?.response?.data?.message;
      })
      .addCase(placeUserOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(placeUserOrder.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.paymentStatus = action.payload;
      })
      .addCase(placeUserOrder.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.error;
      })

      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.updatedUser = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action?.payload?.response?.data?.message;
      })

      .addCase(resetPasswordToken.pending, (state) => {
        state.isLoading.resetPasswordToken = true;
      })
      .addCase(resetPasswordToken.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading.resetPasswordToken = false;
        state.isSuccess = true;
        state.token = action.payload;
        toast.success(
          "A password reset link has been sent to your email. Proceed to your eamil to reset your password."
        );
      })
      .addCase(resetPasswordToken.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading.resetPasswordToken = false;
        state.message = action?.payload?.response?.data?.message;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading.resetPassword = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading.resetPassword = false;
        state.isSuccess = true;
        state.newPassword = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading.resetPassword = false;
        state.message = action?.payload?.response?.data?.message;
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading.getOrders = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading.getOrders = false;
        state.isSuccess = true;
        state.orderedProducts = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.isLoading.getOrders = false;
        state.message = action?.payload?.response?.data?.message;
      })
      .addCase(resetState, () => initialState);
  },
});

export default authSlice.reducer;
