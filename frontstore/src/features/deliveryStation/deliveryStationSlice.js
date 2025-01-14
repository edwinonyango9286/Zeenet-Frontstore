import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import deliveryStationService from "./deliveryStationService.js.js";

export const getAllDeliveyStations = createAsyncThunk(
  "deliveryStation/get-all-delivery-stations",
  async (thunkAPI) => {
    try {
      return await deliveryStationService.getDeliveryStations();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getADeliveryStation = createAsyncThunk(
  "deliveryStation/get-a-delivery-station",
  async (id, thunkAPI) => {
    try {
      return await deliveryStationService.getDeliveryStation(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  deliveryStations: null,
  deliveryStation: null,
  isError: {
    getAllDeliveyStations: false,
    getADeliveryStation: false,
  },
  isLoading: {
    getAllDeliveyStations: false,
    getADeliveryStation: false,
  },
  isSuccess: {
    getAllDeliveyStations: false,
    getADeliveryStation: false,
  },
  message: "",
};

export const resetDeliveryStationState = createAction("Reset_all");

export const deliveryStationSlice = createSlice({
  name: "deliveryStation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllDeliveyStations.pending, (state) => {
        state.isLoading.getAllDeliveyStations = true;
      })
      .addCase(getAllDeliveyStations.fulfilled, (state, action) => {
        state.isLoading.getAllDeliveyStations = false;
        state.isError.getAllDeliveyStations = false;
        state.isSuccess.getAllDeliveyStations = true;
        state.deliveryStations = action?.payload;
      })
      .addCase(getAllDeliveyStations.rejected, (state, action) => {
        state.isLoading.getAllDeliveyStations = false;
        state.isError.getAllDeliveyStations = true;
        state.isSuccess.getAllDeliveyStations = false;
        state.message = action?.payload?.message;
        if (action?.payload?.message) {
          toast.error(action?.payload?.message);
        } else {
          toast.error(
            "We couldn't fetch delivery stations. Please check your internet connection or try a again in a moment."
          );
        }
      })
      .addCase(getADeliveryStation.pending, (state) => {
        state.isLoading.getADeliveryStation = true;
      })
      .addCase(getADeliveryStation.fulfilled, (state, action) => {
        state.isLoading.getADeliveryStation = false;
        state.isError.getADeliveryStation = false;
        state.isSuccess.getADeliveryStation = true;
        state.deliveryStation = action?.payload;
      })
      .addCase(getADeliveryStation.rejected, (state, action) => {
        state.isLoading.getADeliveryStation = false;
        state.isError.getADeliveryStation = true;
        state.isSuccess.getADeliveryStation = false;
        state.message = action?.payload?.response?.data?.message;
        if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "We couldn't fetch the delivery station. Please check your internet connection or try a again in a moment."
          );
        }
      })
      .addCase(resetDeliveryStationState, () => initialState);
  },
});

export default deliveryStationSlice.reducer;
