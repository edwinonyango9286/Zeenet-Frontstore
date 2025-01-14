import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import countryService from "./countryService";

export const getAllCountries = createAsyncThunk(
  "country/get-all-countries",
  async (thunkAPI) => {
    try {
      return await countryService.getCountries();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getACountry = createAsyncThunk(
  "country/get-a-country",
  async (id, thunkAPI) => {
    try {
      return await countryService.getCountry(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  countries: null,
  country: null,
  isError: {
    getAllCountries: false,
    getACountry: false,
  },
  isLoading: {
    getAllCountries: false,
    getACountry: false,
  },
  isSuccess: {
    getAllCountries: false,
    getACountry: false,
  },
  message: "",
};

export const resetCountryState = createAction("Reset_all");

export const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCountries.pending, (state) => {
        state.isLoading.getAllCountries = true;
      })
      .addCase(getAllCountries.fulfilled, (state, action) => {
        state.isLoading.getAllCountries = false;
        state.isError.getAllCountries = false;
        state.isSuccess.getAllCountries = true;
        state.countries = action?.payload;
      })
      .addCase(getAllCountries.rejected, (state, action) => {
        state.isLoading.getAllCountries = false;
        state.isError.getAllCountries = true;
        state.isSuccess.getAllCountries = false;
        state.message = action?.payload?.message;
        if (action?.payload?.message) {
          toast.error(action?.payload?.message);
        } else {
          toast.error(
            "We couldn't fetch countries. Please check your internet connection or try a again in a moment."
          );
        }
      })
      .addCase(getACountry.pending, (state) => {
        state.isLoading.getACountry = true;
      })
      .addCase(getACountry.fulfilled, (state, action) => {
        state.isLoading.getACountry = false;
        state.isError.getACountry = false;
        state.isSuccess.getACountry = true;
        state.country = action?.payload;
      })
      .addCase(getACountry.rejected, (state, action) => {
        state.isLoading.getACountry = false;
        state.isError.getACountry = true;
        state.isSuccess.getACountry = false;
        state.message = action?.payload?.response?.data?.message;
        if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "We couldn't fetch the countries. Please check your internet connection or try a again in a moment."
          );
        }
      })
      .addCase(resetCountryState, () => initialState);
  },
});

export default countrySlice.reducer;
