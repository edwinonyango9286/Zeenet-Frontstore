import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import countyService from "./countyService";

export const getAllCounties = createAsyncThunk(
  "county/get-all-counties",
  async (thunkAPI) => {
    try {
      return await countyService.getCounties();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getACounty = createAsyncThunk(
  "county/get-a-county",
  async (id, thunkAPI) => {
    try {
      return await countyService.getCounty(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  counties: null,
  county: null,
  isError: {
    getAllCounties: false,
    getACounty: false,
  },
  isLoading: {
    getAllCounties: false,
    getACounty: false,
  },
  isSuccess: {
    getAllCounties: false,
    getACounty: false,
  },
  message: "",
};

export const resetCountyState = createAction("Reset_all");

export const countySlice = createSlice({
  name: "county",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCounties.pending, (state) => {
        state.isLoading.getAllCounties = true;
      })
      .addCase(getAllCounties.fulfilled, (state, action) => {
        state.isLoading.getAllCounties = false;
        state.isError.getAllCounties = false;
        state.isSuccess.getAllCounties = true;
        state.counties = action?.payload;
      })
      .addCase(getAllCounties.rejected, (state, action) => {
        state.isLoading.getAllCounties = false;
        state.isError.getAllCounties = true;
        state.isSuccess.getAllCounties = false;
        state.message = action?.payload?.message;
        if (action?.payload?.message) {
          toast.error(action?.payload?.message);
        } else {
          toast.error(
            "We couldn't fetch countries. Please check your internet connection or try a again in a moment."
          );
        }
      })
      .addCase(getACounty.pending, (state) => {
        state.isLoading.getACounty = true;
      })
      .addCase(getACounty.fulfilled, (state, action) => {
        state.isLoading.getACounty = false;
        state.isError.getACounty = false;
        state.isSuccess.getACounty = true;
        state.county = action?.payload;
      })
      .addCase(getACounty.rejected, (state, action) => {
        state.isLoading.getACounty = false;
        state.isError.getACounty = true;
        state.isSuccess.getACounty = false;
        state.message = action?.payload?.response?.data?.message;
        if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "We couldn't fetch the countries. Please check your internet connection or try a again in a moment."
          );
        }
      })
      .addCase(resetCountyState, () => initialState);
  },
});

export default countySlice.reducer;
