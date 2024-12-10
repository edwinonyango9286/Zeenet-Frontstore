import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import contactService from "./contactService";
import { toast } from "react-toastify";
import { message } from "antd";

export const createEnquiry = createAsyncThunk(
  "enquiries/post-enquiry",
  async (contactData, thunkAPI) => {
    try {
      return await contactService.postEnquiry(contactData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const enquiryState = {
  enquiries: [],
  createdEnquiry: null,
  isError: {
    createEnquiry: false,
  },
  isLoading: {
    createEnquiry: false,
  },
  isSuccess: {
    createEnquiry: false,
  },
  message: "",
};

export const contactSlice = createSlice({
  name: "enquiries",
  initialState: enquiryState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEnquiry.pending, (state) => {
        state.isLoading.createEnquiry = true;
      })
      .addCase(createEnquiry.fulfilled, (state, action) => {
        state.isLoading.createEnquiry = false;
        state.isError.createEnquiry = false;
        state.isSuccess.createEnquiry = true;
        state.createdEnquiry = action?.payload;
        toast.success(
          "Your enquiry has been submitted. We’ll review it and get back to you shortly."
        );
      })

      .addCase(createEnquiry.rejected, (state, action) => {
        state.isLoading.createEnquiry = false;
        state.isError.createEnquiry = true;
        state.isSuccess.createEnquiry = false;
        state.message = action?.payload?.response?.data?.message;
        if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "We couldn't create the enquiry. Please check your internet connection or try again in a moment."
          );
        }
      })
      .addCase(resetState, () => enquiryState);
  },
});

export default contactSlice.reducer;
