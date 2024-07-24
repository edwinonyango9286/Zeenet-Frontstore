import { createSlice, createAsyncThunk,createAction } from "@reduxjs/toolkit";
import contactService from "./contactService";
import { toast } from "react-toastify";

export const createEnquiry = createAsyncThunk(
  "contact/post-enquiry",
  async (contactData, thunkAPI) => {
    try {
      return await contactService.postEnquiry(contactData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all")
   
const enquiryState = {
  enquiries: [],
  isError: false,
  isLoading: false,
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
        state.isLoading = true;
      })
      .addCase(createEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdEnquiry = action.payload;
        if (state.isSuccess === true) {
          toast.success("Enquiry Submitted.");
        }
      })
      .addCase(createEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error("Something went wrong, Please try again.");
        }
      })
      .addCase(resetState, () => enquiryState);
  },
});

export default contactSlice.reducer;
