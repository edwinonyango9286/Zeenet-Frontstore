import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/userSlice";
import productReducer from "../features/products/productSlice";
import blogReducer from "../features/blogs/blogSlice";
import contactReducer from "../features/contact/contactSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    blog: blogReducer,
    contact: contactReducer,
  },
  devTools: process.env.REACT_APP_NODE_ENV !== "production",
});
