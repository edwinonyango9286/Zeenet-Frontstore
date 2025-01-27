import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import blogService from "./blogService";
import { toast } from "react-toastify";

export const getAllBlogs = createAsyncThunk(
  "blogs/get-all-blogs",
  async (thunkAPI) => {
    try {
      return await blogService.getBlogs();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getABlog = createAsyncThunk(
  "blogs/get-a-blog",
  async (id, thunkAPI) => {
    try {
      return await blogService.getBlog(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  blogs: [],
  blog: null,
  isError: {
    getAllBlogs: false,
    getABlog: false,
  },
  isLoading: {
    getAllBlogs: false,
    getABlog: false,
  },
  isSuccess: {
    getAllBlogs: false,
    getABlog: false,
  },
  message: "",
};

export const reseBlogState = createAction("Reset_all");

export const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogs.pending, (state) => {
        state.isLoading.getAllBlogs = true;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.isLoading.getAllBlogs = false;
        state.isError.getAllBlogs = false;
        state.isSuccess.getAllBlogs = true;
        state.blogs = action?.payload;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.isLoading.getAllBlogs = false;
        state.isError.getAllBlogs = true;
        state.isSuccess.getAllBlogs = false;
        state.message = action?.payload?.response?.data?.message;
        if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "We couldn't fetch blogs. Please check your internet connection or try a again in a moment."
          );
        }
      })
      .addCase(getABlog.pending, (state) => {
        state.isLoading.getABlog = true;
      })
      .addCase(getABlog.fulfilled, (state, action) => {
        state.isLoading.getABlog = false;
        state.isError.getABlog = false;
        state.isSuccess.getABlog = true;
        state.blog = action?.payload;
      })
      .addCase(getABlog.rejected, (state, action) => {
        state.isLoading.getABlog = false;
        state.isError.getABlog = true;
        state.isSuccess.getABlog = false;
        state.message = action?.payload?.response?.data?.message;
        if (action?.payload?.response?.data?.message) {
          toast.error(action?.payload?.response?.data?.message);
        } else {
          toast.error(
            "We couldn't fetch the blog. Please check your internet connection or try a again in a moment."
          );
        }
      })
      .addCase(reseBlogState, () => initialState);
  },
});

export default blogSlice.reducer;
