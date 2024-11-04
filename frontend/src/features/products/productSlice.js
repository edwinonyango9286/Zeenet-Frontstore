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
  product: null,
  wishlist: [],
  isError: {
    getAllProducts: false,
    getAproduct: false,
    addProductToWishlist: false,
    removeProductFromWishlist: false,
    addProductRating: false,
  },
  isLoading: {
    getAllProducts: false,
    getAproduct: false,
    addProductToWishlist: false,
    removeProductFromWishlist: false,
    addProductRating: false,
  },
  isSuccess: {
    getAllProducts: false,
    getAproduct: false,
    addProductToWishlist: false,
    removeProductFromWishlist: false,
    addProductRating: false,
  },
  message: "",
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading.getAllProducts = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading.getAllProducts = false;
        state.isError.getAllProducts = false;
        state.isSuccess.getAllProducts = true;
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading.getAllProducts = false;
        state.isError.getAllProducts = true;
        state.isSuccess.getAllProducts = false;
        state.message = action?.payload?.response?.data?.message;
      })
      .addCase(addProductToWishlist.pending, (state) => {
        state.isLoading.addProductToWishlist = true;
      })
      .addCase(addProductToWishlist.fulfilled, (state, action) => {
        state.isLoading.addProductToWishlist = false;
        state.isError.addProductToWishlist = false;
        state.isSuccess.addProductToWishlist = true;
        state.wishlist = action.payload;
        toast.success("Product added to your wishlist.");
      })
      .addCase(addProductToWishlist.rejected, (state, action) => {
        state.isLoading.addProductToWishlist = false;
        state.isError.addProductToWishlist = true;
        state.isSuccess.addProductToWishlist = false;
        state.message = action?.payload?.response?.data?.message;
        toast.error(state.message);
      })
      .addCase(removeProductFromWishlist.pending, (state) => {
        state.isLoading.removeProductFromWishlist = true;
      })
      .addCase(removeProductFromWishlist.fulfilled, (state, action) => {
        state.isLoading.removeProductFromWishlist = false;
        state.isError.removeProductFromWishlist = false;
        state.isSuccess.removeProductFromWishlist = true;
        state.wishlist = action.payload;
        toast.success("Product removed from your wishlist.");
      })
      .addCase(removeProductFromWishlist.rejected, (state, action) => {
        state.isLoading.removeProductFromWishlist = false;
        state.isError.removeProductFromWishlist = true;
        state.isSuccess.removeProductFromWishlist = false;
        state.message = action?.payload?.response?.data?.message;
        toast.error(state.message);
      })
      .addCase(getAproduct.pending, (state) => {
        state.isLoading.getAproduct = true;
      })
      .addCase(getAproduct.fulfilled, (state, action) => {
        state.isLoading.getAproduct = false;
        state.isError.getAproduct = false;
        state.isSuccess.getAproduct = true;
        state.product = action.payload;
      })
      .addCase(getAproduct.rejected, (state, action) => {
        state.isLoading.getAproduct = false;
        state.isError.getAproduct = true;
        state.isSuccess.getAproduct = false;
        state.message = action?.payload?.response?.data?.message;
      })
      .addCase(addProductRating.pending, (state) => {
        state.isLoading.addProductRating = true;
      })
      .addCase(addProductRating.fulfilled, (state, action) => {
        state.isLoading.addProductRating = false;
        state.isError.addProductRating = false;
        state.isSuccess.addProductRating = true;
        state.rating = action.payload;
        toast.success("Product rating has been submitted.");
      })
      .addCase(addProductRating.rejected, (state, action) => {
        state.isLoading.addProductRating = false;
        state.isError.addProductRating = true;
        state.isSuccess.addProductRating = false;
        state.message = action?.payload?.response?.data?.message;
      })
      .addCase(resetState, () => initialState);
  },
});

export default productSlice.reducer;
