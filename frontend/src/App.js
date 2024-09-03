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
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="store" element={<Store />} />
            <Route path="product/:id" element={<SingleProduct />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="blogs/singleblog/:id" element={<SingleBlog />} />
            <Route path="contact" element={<Contact />} />
            <Route path="compare-products" element={<CompareProducts />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="/my-profile" element={<Profile />} />
            <Route
              path="login"
              element={
                <OpenRoutes>
                  <Login />
                </OpenRoutes>
              }
            />

            <Route path="cart" element={<Cart />} />

            <Route
              path="/myorders"
              element={
                <PrivateRoutes>
                  <MyOrders />
                </PrivateRoutes>
              }
            />
            <Route
              path="checkout"
              element={
                <PrivateRoutes>
                  <Checkout />
                </PrivateRoutes>
              }
            />
            <Route path="forgot-password" element={<ForgotPassword />} />

            <Route
              path="signup"
              element={
                <OpenRoutes>
                  <Signup />
                </OpenRoutes>
              }
            />
            <Route path="reset-password/:token" element={<ResetPassword />} />
            <Route path="refund-policy" element={<RefundPolicy />} />
            <Route path="shipping-policy" element={<ShippingPolicy />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route
              path="terms-and-conditions"
              element={<TermsandConditions />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
