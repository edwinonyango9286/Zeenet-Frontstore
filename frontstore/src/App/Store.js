import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/userSlice";
import productReducer from "../features/products/productSlice";
import blogReducer from "../features/blogs/blogSlice";
import contactReducer from "../features/contact/contactSlice";
import countryReducer from "../features/country/countrySlice";
import countyReducer from "../features/county/countySlice";
import townReducer from "../features/town/townSlice";
import deliveveryStationReducer from "../features/deliveryStation/deliveryStationSlice";
import deliveryAddressReducer from "../features/deliveryAddress/deliveryAddressSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    blog: blogReducer,
    contact: contactReducer,
    country: countryReducer,
    county: countyReducer,
    town: townReducer,
    deliveryStation: deliveveryStationReducer,
    deliveryAddress: deliveryAddressReducer,
  },
  devTools: process.env.REACT_APP_NODE_ENV !== "production",
});
