import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import Container from "../Components/Container";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Meta from "../Components/Meta";
import { toast } from "react-toastify";
import { addADeliveryAddress, checkout } from "../features/users/userSlice";
import Cookies from "js-cookie";
import { getAllCountries } from "../features/country/countrySlice";
import { getAllCounties } from "../features/county/countySlice";
import { getAllTowns } from "../features/town/townSlice";
import { getAllDeliveyStations } from "../features/deliveryStation/deliveryStationSlice";

const DELIVERY_ADDRESS_SCHEMA = Yup.object().shape({
  country: Yup.string().required("Please select country."),
  county: Yup.string().required("Please select county"),
  town: Yup.string().required("Please select town."),
  pickupStation: Yup.string().required("Please select a pickup station."),
});

const Checkout = () => {
  const dispatch = useDispatch();
  const userCart = useSelector((state) => state?.user?.userCart);
  const isLoading = useSelector((state) => state?.user?.isLoading?.checkout);
  const [totalAmount, setTotalAmount] = useState(null);
  const [ShippingInfo, setShippingInfo] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const isSuccessAddingAdeliveryAddress = useSelector(
    (state) => state?.user?.isSuccess?.addADeliveryAddress
  );
  const deliveryAddress = useSelector((state) => state?.user?.deliveryAddress);
  const countries = useSelector((state) => state?.country?.countries);
  const counties = useSelector((state) => state?.county?.counties);
  const towns = useSelector((state) => state?.town?.towns);
  const deliveryStations = useSelector(
    (state) => state?.deliveryStation?.deliveryStations
  );

  const [firstName, setFirstName] = useState("");
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    dispatch(getAllCountries());
    dispatch(getAllCounties());
    dispatch(getAllTowns());
    dispatch(getAllDeliveyStations());
  }, [dispatch]);

  useEffect(() => {
    const userFirstName = Cookies.get("firstName");
    const UserToken = Cookies.get("token");
    const userEmail = Cookies.get("email");
    const userPhoneNumber = Cookies.get("phoneNumber");
    if (userFirstName) setFirstName(userFirstName);
    if (UserToken) setToken(UserToken);
    if (userEmail) setEmail(userEmail);
    if (userPhoneNumber) setPhoneNumber(userPhoneNumber);
  }, []);

  useEffect(() => {
    if (!userCart || userCart.length === 0) {
      setTotalAmount(null);
      return;
    }
    let sum = 0;
    for (let index = 0; index < userCart?.length; index++) {
      sum = sum + Number(userCart[index]?.quantity) * userCart[index]?.price;
      setTotalAmount(sum);
    }
  }, [userCart]);

  const formik = useFormik({
    initialValues: {
      country: "",
      county: "",
      town: "",
      pickupStation: "",
    },
    validationSchema: DELIVERY_ADDRESS_SCHEMA,
    onSubmit: (values) => {
      addADeliveryAddress(values);
    },
  });

  useEffect(() => {
    if (isSuccessAddingAdeliveryAddress && deliveryAddress) {
      formik.resetForm();
    }
  }, [isSuccessAddingAdeliveryAddress, deliveryAddress]);

  const formatKES = (amount) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handlePlaceOrder = () => {
    if (!totalAmount || totalAmount === 0) {
      toast.error(
        "Your cart is empty. Add items to your cart to proceed with checkout. "
      );
    }
    const paymentInfo = {
      amount: totalAmount,
      phone: phoneNumber,
    };
    dispatch(checkout(paymentInfo));
    setPaymentStatus("pending");
  };

  useEffect(() => {
    if (paymentStatus === "success") {
      toast.success("Payment successful");
    } else if (paymentStatus === "failure") {
      toast.error("We can not complete payment your at this time.");
    }
  }, [paymentStatus]);

  return (
    <>
      <Meta title={"Checkout"} />
      <Container class1="checkout-wrapper py-md-2 home-wrapper-2">
        <div className="row">
          <div className="col-12 d-md-inline-flex gap-md-2">
            <div className="col-12 col-md-6 ">
              <div className="checkout-left-data">
                <h6 className="logo py-2 mb-0 mt-0">ZEENET</h6>
                <h6
                  className="my-0"
                  style={{ fontSize: "14px", fontWeight: "400" }}
                >
                  Account
                </h6>
                <div className="d-flex flex-column justify-content-between gap-2">
                  <p style={{ fontSize: "12px" }} className="mb-0 mt-0">
                    {email}
                  </p>
                </div>
                <h6
                  style={{ fontSize: "16px", fontWeight: "600" }}
                  className="my-4"
                >
                  Add a delivery address
                </h6>
                <form
                  className="d-flex gap-2 flex-wrap flex-column flex-md-row justify-content-between gap-2"
                  onSubmit={formik.handleSubmit}
                >
                  <div className="w-100">
                    <label htmlFor="pickupStation">Country</label>
                    <select
                      name="country"
                      className="form-control form-select shadow-none outline-none"
                      id="country"
                      onChange={formik.handleChange("country")}
                      onBlur={formik.handleBlur("coucountrynty")}
                      value={formik.values.country}
                    >
                      <option value="" label="Select a country" />
                      {Array.isArray(countries) &&
                        countries.map((country, index) => (
                          <option key={index} value={country?._id}>
                            {country?.name}
                          </option>
                        ))}
                    </select>
                    <div className="error ms-2">
                      {formik.touched.country && formik.errors.country}
                    </div>
                  </div>

                  <div className="w-100">
                    <label htmlFor="County">County</label>
                    <select
                      name="county"
                      className="form-control form-select shadow-none outline-none"
                      id="county"
                      onChange={formik.handleChange("county")}
                      onBlur={formik.handleBlur("county")}
                      value={formik.values.county}
                    >
                      <option value="" label="Select a county" />
                      {Array.isArray(counties) &&
                        counties.map((county, index) => (
                          <option key={index} value={county?._id}>
                            {county?.name}
                          </option>
                        ))}
                    </select>
                    <div className="error ms-2">
                      {formik.touched.county && formik.errors.county}
                    </div>
                  </div>

                  <div className="w-100">
                    <label htmlFor="town">Nearest Town</label>

                    <select
                      name="town"
                      className="form-control form-select shadow-none outline-none"
                      id="town"
                      onChange={formik.handleChange("town")}
                      onBlur={formik.handleBlur("town")}
                      value={formik.values.town}
                    >
                      <option value="" label="Select a nearest town." />
                      {Array.isArray(towns) &&
                        towns.map((town, index) => (
                          <option key={index} value={town?._id}>
                            {town?.name}
                          </option>
                        ))}
                    </select>
                    <div className="error ms-2">
                      {formik.touched.town && formik.errors.town}
                    </div>
                  </div>

                  <div className="w-100">
                    <label htmlFor="pickupStation">Pickup Station</label>
                    <select
                      name="pickupStation"
                      className="form-control form-select shadow-none outline-none"
                      id="pickupStation"
                      onChange={formik.handleChange("pickupStation")}
                      onBlur={formik.handleBlur("pickupStation")}
                      value={formik.values.pickupStation}
                    >
                      <option
                        value=""
                        label="Select a nearest delivery station."
                      />

                      {Array.isArray(deliveryStations) &&
                        deliveryStations.map((deliveryStation, index) => (
                          <option key={index} value={deliveryStation?._id}>
                            {deliveryStation?.name}
                          </option>
                        ))}
                    </select>
                    <div className="error ms-2">
                      {formik.touched.pickupStation &&
                        formik.errors.pickupStation}
                    </div>
                  </div>

                  <div className="my-3">
                    <button
                      className={"button border-0"}
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="d-flex flex-row gap-1 align-items-center justify-content-center">
                          <span
                            class="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>{" "}
                          <span>Please wait...</span>
                        </div>
                      ) : (
                        "submit"
                      )}
                    </button>
                  </div>
                </form>
                <div className="w-100 mt-5 mb-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark">
                      <IoArrowBackSharp className="me-2" />
                      Return to cart
                    </Link>
                    <Link to="/store" className="button">
                      Continue to shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6  p-md-4">
              <div className="border-bottom py-4">
                {userCart &&
                  userCart?.length > 0 &&
                  userCart?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="d-flex gap-4 mb-3 align-items-center"
                      >
                        <div className="w-75 d-flex gap-10">
                          <div className="w-25 position-relative">
                            <span
                              style={{ top: "-8px", right: "-2px" }}
                              className="badge bg-secondary text-white rounded-pill  position-absolute"
                            >
                              {item?.quantity}
                            </span>
                            <img
                              src={item?.images}
                              className="img-fluid border rounded "
                              width={120}
                              height={120}
                              alt="Product"
                            ></img>
                          </div>
                          <div>
                            <h5 className="total-price">{item?.title}</h5>
                            <h5 className="total-price">
                              {item?.brand?.title}
                            </h5>
                            <h5 className="total-price">
                              {formatKES(item?.price)}
                            </h5>
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="total">
                            {formatKES(item?.quantity * item?.price)}
                          </h5>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="border-bottom py-2">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="total mb-0 mt-0">Sub total</p>
                  <p className="total-price mb-0 mt-0">
                    {formatKES(totalAmount)}
                  </p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0 total mb-0 mt-0">Delivery fee</p>
                  <p className="mb-0 total-price">Ksh 0</p>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center border-bottom py-2">
                <h4 className="total">Total</h4>
                <h5 className="total-price">{formatKES(totalAmount)} </h5>
              </div>
              <div className="py-4 d-flex align-items-center justify-content-end">
                <button
                  className={`button signup border-0 ${
                    !totalAmount || totalAmount === 0
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  type="submit"
                  onClick={handlePlaceOrder}
                  disabled={isLoading || !totalAmount || totalAmount === 0}
                >
                  {isLoading ? (
                    <div className="d-flex flex-row gap-1 align-items-center justify-content-center">
                      <span
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>{" "}
                      <span>Please wait...</span>
                    </div>
                  ) : (
                    "Checkout"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};
export default Checkout;
