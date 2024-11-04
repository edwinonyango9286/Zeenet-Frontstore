import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogService from "./blogService";

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

const blogState = {
  blogs: [],
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
    getAllBlogs: false,
  },
  message: "",
};

export const blogSlice = createSlice({
  name: "blogs",
  initialState: blogState,
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
        state.blogs = action.payload;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.isLoading.getAllBlogs = false;
        state.isError.getAllBlogs = true;
        state.isSuccess.getAllBlogs = false;
        state.message = action?.payload?.response?.data?.message;
      })
      .addCase(getABlog.pending, (state) => {
        state.isLoading.getABlog = true;
      })
      .addCase(getABlog.fulfilled, (state, action) => {
        state.isLoading.getABlog = false;
        state.isError.getABlog = false;
        state.isSuccess.getABlog = true;
        state.singleBlog = action.payload;
      })
      .addCase(getABlog.rejected, (state, action) => {
        state.isLoading.getABlog = false;
        state.isError.getABlog = true;
        state.isSuccess.getABlog = false;
        state.message = action?.payload?.response?.data?.message;
      });
  },
});

export default blogSlice.reducer;
