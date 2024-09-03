import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/users/userSlice";
import productReducer from "../features/products/productSlice";
import blogReducer from "../features/blogs/blogSlice";
import contactReducer from "../features/contact/contactSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedProductReducer = persistReducer(persistConfig, productReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    product: persistedProductReducer,
    blog: blogReducer,
    contact: contactReducer,
  },
  devTools: process.env.REACT_APP_NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);
