import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import deliveryAddressService from "./deliveryAddressService";

export const addADeliveryAddress = createAsyncThunk(
  "deliveryAddress/add-a-delivery-address",
  async (data, thunkAPI) => {
    try {
      return await deliveryAddressService.addDeliveryAddress(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserDeliveryAddresses = createAsyncThunk(
  "deliveryAddress/get-user-delivery-addresses",
  async (thunkAPI) => {
    try {
      return await deliveryAddressService.getDeliveryAdddresses();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const removeUserDeliveryAddress = createAsyncThunk(
  "deliveryAddress/remove-user-delivery-addresses",
  async (deliveryAddressId, thunkAPI) => {
    try {
      return await deliveryAddressService.removeDeliveryAdddress(
        deliveryAddressId
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetDeliveryAddressState = createAction("Reset_all");

const initialState = {
  userDeliveryAddresses: null,
  addedDeliveryAddress: null,
  isError: {
    addADeliveryAddress: false,
    getUserDeliveryAddresses: false,
    removeUserDeliveryAddress: false,
  },
  isLoading: {
    addADeliveryAddress: false,
    getUserDeliveryAddresses: false,
    removeUserDeliveryAddress: false,
  },
  isSuccess: {
    addADeliveryAddress: false,
    getUserDeliveryAddresses: false,
    removeUserDeliveryAddress: false,
  },
  message: "",
};

export const deliveryAddressSlice = createSlice({
  name: "deliveryAddress",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addADeliveryAddress.pending, (state) => {
        state.isLoading.addADeliveryAddress = true;
      })
      .addCase(addADeliveryAddress.fulfilled, (state, action) => {
        state.isError.addADeliveryAddress = false;
        state.isLoading.addADeliveryAddress = false;
        state.isSuccess.addADeliveryAddress = true;
        state.addedDeliveryAddress = action?.payload;
        toast.success(action?.payload?.message);
      })
      .addCase(addADeliveryAddress.rejected, (state, action) => {
        state.isError.addADeliveryAddress = true;
        state.isSuccess.addADeliveryAddress = false;
        state.isLoading.addADeliveryAddress = false;
        state.message = action?.payload?.message;
        if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "It seems there’s an issue at the moment. Please try again later."
          );
        }
      })
      .addCase(getUserDeliveryAddresses.pending, (state) => {
        state.isLoading.getUserDeliveryAddresses = true;
      })
      .addCase(getUserDeliveryAddresses.fulfilled, (state, action) => {
        state.isError.getUserDeliveryAddresses = false;
        state.isLoading.getUserDeliveryAddresses = false;
        state.isSuccess.getUserDeliveryAddresses = true;
        state.userDeliveryAddresses = action?.payload;
      })
      .addCase(getUserDeliveryAddresses.rejected, (state, action) => {
        state.isError.getUserDeliveryAddresses = true;
        state.isSuccess.getUserDeliveryAddresses = false;
        state.isLoading.getUserDeliveryAddresses = false;
        state.message = action?.payload?.message;
        if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "It seems there’s an issue at the moment. Please try again later."
          );
        }
      })
      .addCase(removeUserDeliveryAddress.pending, (state) => {
        state.isLoading.removeUserDeliveryAddress = true;
      })
      .addCase(removeUserDeliveryAddress.fulfilled, (state, action) => {
        state.isError.removeUserDeliveryAddress = false;
        state.isLoading.removeUserDeliveryAddress = false;
        state.isSuccess.removeUserDeliveryAddress = true;
        toast.success(action?.payload?.response?.data?.message);
      })
      .addCase(removeUserDeliveryAddress.rejected, (state, action) => {
        state.isError.removeUserDeliveryAddress = true;
        state.isSuccess.removeUserDeliveryAddress = false;
        state.isLoading.removeUserDeliveryAddress = false;
        state.message = action?.payload?.message;
        if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "It seems there’s an issue at the moment. Please try again later."
          );
        }
      })
      .addCase(resetDeliveryAddressState, () => initialState);
  },
});

export default deliveryAddressSlice.reducer;
