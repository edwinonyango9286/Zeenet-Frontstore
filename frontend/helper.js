import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Store from "./Pages/Store";
import Blogs from "./Pages/Blogs";
import CompareProducts from "./Pages/CompareProducts";
import Wishlist from "./Pages/Wishlist";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgotPassword";
import Signup from "./Pages/Signup";
import ResetPassword from "./Pages/ResetPassword";
import SingleBlog from "./Pages/SingleBlog";
import RefundPolicy from "./Pages/RefundPolicy";
import ShippingPolicy from "./Pages/ShippingPolicy";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsandConditions from "./Pages/TermsandConditions";
import SingleProduct from "./Pages/SingleProduct";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import { PrivateRoutes } from "./routing/PrivateRoutes";
import { OpenRoutes } from "./routing/OpenRoutes";
import Profile from "./Pages/Profile";
import MyOrders from "./Pages/MyOrders";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              element={
                <PrivateRoutes>
                  <React.Fragment>
                    <Route path="my-profile" element={<Profile />} />
                    <Route path="myorders" element={<MyOrders />} />
                    <Route path="checkout" element={<Checkout />} />
                  </React.Fragment>
                </PrivateRoutes>
              }
            />
            <Route
              element={
                <OpenRoutes>
                  <React.Fragment>
                    <Route path="login" element={<Login />} />
                    <Route index element={<Home />} />
                    <Route path="store" element={<Store />} />
                    <Route
                      path="forgot-password"
                      element={<ForgotPassword />}
                    />
                    <Route path="blogs" element={<Blogs />} />
                    <Route path="product/:id" element={<SingleProduct />} />
                    <Route path="about" element={<About />} />
                    <Route
                      path="compare-products"
                      element={<CompareProducts />}
                    />
                    <Route path="contact" element={<Contact />} />
                    <Route
                      path="blogs/singleblog/:id"
                      element={<SingleBlog />}
                    />
                    <Route path="signup" element={<Signup />} />
                    <Route
                      path="reset-password/:token"
                      element={<ResetPassword />}
                    />
                    <Route path="refund-policy" element={<RefundPolicy />} />
                    <Route
                      path="shipping-policy"
                      element={<ShippingPolicy />}
                    />
                    <Route path="privacy-policy" element={<PrivacyPolicy />} />
                    <Route
                      path="terms-and-conditions"
                      element={<TermsandConditions />}
                    />
                  </React.Fragment>
                </OpenRoutes>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

// PrivateRoutes.js

import React from "react";
import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  
  // Assuming 'isAdmin' is a property in your user object that indicates admin status
  return user && user.token && !user.isAdmin ? (
    children
  ) : (
    <Navigate to={"/login"} replace={true} />
  );
};
