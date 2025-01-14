import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import townService from "./townService";

export const getAllTowns = createAsyncThunk(
  "town/get-all-towns",
  async (thunkAPI) => {
    try {
      return await townService.getTowns();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getATown = createAsyncThunk(
  "town/get-a-town",
  async (id, thunkAPI) => {
    try {
      return await townService.getTown(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  towns: null,
  town: null,
  isError: {
    getAllTowns: false,
    getATown: false,
  },
  isLoading: {
    getAllTowns: false,
    getATown: false,
  },
  isSuccess: {
    getAllTowns: false,
    getATown: false,
  },
  message: "",
};

export const resetTownState = createAction("Reset_all");

export const townSlice = createSlice({
  name: "town",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTowns.pending, (state) => {
        state.isLoading.getAllTowns = true;
      })
      .addCase(getAllTowns.fulfilled, (state, action) => {
        state.isLoading.getAllTowns = false;
        state.isError.getAllTowns = false;
        state.isSuccess.getAllTowns = true;
        state.towns = action?.payload;
      })
      .addCase(getAllTowns.rejected, (state, action) => {
        state.isLoading.getAllTowns = false;
        state.isError.getAllTowns = true;
        state.isSuccess.getAllTowns = false;
        state.message = action?.payload?.message;
        if (action?.payload?.message) {
          toast.error(action?.payload?.message);
        } else {
          toast.error(
            "We couldn't fetch towns. Please check your internet connection or try a again in a moment."
          );
        }
      })
      .addCase(getATown.pending, (state) => {
        state.isLoading.getATown = true;
      })
      .addCase(getATown.fulfilled, (state, action) => {
        state.isLoading.getATown = false;
        state.isError.getATown = false;
        state.isSuccess.getATown = true;
        state.town = action?.payload;
      })
      .addCase(getATown.rejected, (state, action) => {
        state.isLoading.getATown = false;
        state.isError.getATown = true;
        state.isSuccess.getATown = false;
        state.message = action?.payload?.response?.data?.message;
        if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "We couldn't fetch the town. Please check your internet connection or try a again in a moment."
          );
        }
      })
      .addCase(resetTownState, () => initialState);
  },
});

export default townSlice.reducer;
