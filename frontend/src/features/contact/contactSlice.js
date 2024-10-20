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
  isError: false,
  isLoading: {
    createEnquiry: false,
  },
  isSuccess: false,
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
        state.isError = false;
        state.isSuccess = true;
        state.createdEnquiry = action.payload;
        toast.success(
          "Enquiry Submitted. We will review and provide response in a few."
        );
      })
      
      .addCase(createEnquiry.rejected, (state, action) => {
        state.isLoading.createEnquiry = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action?.payload?.response?.data?.message;
        toast.error(message || "Something went wrong. Please try again later.");
      })
      .addCase(resetState, () => enquiryState);
  },
});

export default contactSlice.reducer;
