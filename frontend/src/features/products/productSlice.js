import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import productService from "./productService";
import { toast } from "react-toastify";

export const getAllProducts = createAsyncThunk(
  "products/get-all-products",
  async (data, thunkAPI) => {
    try {
      return await productService.getProducts(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAproduct = createAsyncThunk(
  "products/get-a-product",
  async (id, thunkAPI) => {
    try {
      return await productService.getProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addProductToWishlist = createAsyncThunk(
  "products/add-to-wishlist",
  async (productId, thunkAPI) => {
    try {
      return await productService.addToWishlist(productId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const removeProductFromWishlist = createAsyncThunk(
  "products/remove-product-from-wishlist",
  async (productId, thunkAPI) => {
    try {
      return await productService.removeFromWishlist(productId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addProductRating = createAsyncThunk(
  "products/add-product-rating",
  async (data, thunkAPI) => {
    try {
      return await productService.addRating(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  products: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action?.payload?.response?.data?.message;
      })
      .addCase(addProductToWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProductToWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.wishlist = action.payload;
        toast.success("Product added to your wishlist.");
      })
      .addCase(addProductToWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action?.payload?.response?.data?.message;
        toast.error(state.message);
      })
      .addCase(removeProductFromWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeProductFromWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.wishlist = action.payload;
        toast.success("Product removed from your wishlist.");
      })
      .addCase(removeProductFromWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action?.payload?.response?.data?.message;
        toast.error(state.message);
      })
      .addCase(getAproduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAproduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.product = action.payload;
      })
      .addCase(getAproduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(addProductRating.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProductRating.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.rating = action.payload;
      })
      .addCase(addProductRating.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action?.payload?.response?.data?.message;
      })
      .addCase(resetState, () => initialState);
  },
});

export default productSlice.reducer;
