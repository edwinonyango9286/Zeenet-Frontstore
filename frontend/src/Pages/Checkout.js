import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import Container from "../Components/Container";
import CustomInput from "../Components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Meta from "../Components/Meta";
import { toast } from "react-toastify";
import { placeUserOrder } from "../features/users/userSlice";

const shippingSchema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  address: Yup.string().required(),
  city: Yup.string().required(),
  other: Yup.string().required(),
  state: Yup.string().required(),
  country: Yup.string().required(),
  pincode: Yup.string().required(),
});

const Checkout = () => {
  const dispatch = useDispatch();
  const userCart = useSelector((state) => state?.user?.userCart);
  const user = useSelector((state) => state?.user?.user);
  console.log(user);
  const [totalAmount, setTotalAmount] = useState(null);
  const [ShippingInfo, setShippingInfo] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < userCart?.length; index++) {
      sum = sum + Number(userCart[index]?.quantity) * userCart[index]?.price;
      setTotalAmount(sum);
    }
  }, [userCart]);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      other: "",
      state: "",
      country: "",
      pincode: "",
    },

    validationSchema: shippingSchema,
    onSubmit: (values) => {
      setShippingInfo(values);
    },
  });

  const formatKES = (amount) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handlePlaceOrder = async () => {
    const paymentInfo = {
      amount: totalAmount,
      phone: user?.phone,
    };
    console.log(paymentInfo);
    dispatch(placeUserOrder(paymentInfo));
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
                    {user?.email}
                  </p>
                </div>

                <h6
                  style={{ fontSize: "14px", fontWeight: "400" }}
                  className="my-2"
                >
                  Delivery address
                </h6>
                <form
                  className="d-flex gap-2 flex-wrap justify-content-between"
                  onSubmit={formik.handleSubmit}
                >
                  <div className="w-100">
                    <select
                      name="country"
                      className="form-control form-select shadow-none outline-none"
                      id="country"
                      onChange={formik.handleChange("country")}
                      onBlur={formik.handleBlur("country")}
                      value={formik.values.country}
                    >
                      <option disabled>Select Country.</option>
                      <option value="Kenya" selected>
                        Kenya
                      </option>
                      <option value="Uganda">Uganda</option>
                    </select>
                    <div className="error ms-2">
                      {formik.touched.country && formik.errors.country}
                    </div>
                  </div>

                  <div className="flex-grow-1">
                    <CustomInput
                      type="type"
                      placeholder="First name."
                      name="firstName"
                      id="firstName"
                      defaultValue={user?.firstname}
                      onChange={formik.handleChange("firstName")}
                      onBlur={formik.handleBlur("firstName")}
                      value={formik.values.firstName}
                    />
                    <div className="error ms-2">
                      {formik.touched.firstName && formik.errors.firstName}
                    </div>
                  </div>

                  <div className="flex-grow-1">
                    <CustomInput
                      type="text"
                      placeholder="Last name."
                      name="lastname"
                      id="lastname"
                      defaultValue={user?.lastname}
                      onChange={formik.handleChange("lastName")}
                      onBlur={formik.handleBlur("lastName")}
                      value={formik.values.lastName}
                    />
                    <div className="error ms-2">
                      {formik.touched.lastName && formik.errors.lastName}
                    </div>
                  </div>

                  <div className="w-100">
                    <CustomInput
                      type="text"
                      placeholder="Address."
                      name="address"
                      id="address"
                      onChange={formik.handleChange("address")}
                      onBlur={formik.handleBlur("address")}
                      value={formik.values.address}
                    />
                    <div className="error ms-2">
                      {formik.touched.address && formik.errors.address}
                    </div>
                  </div>
                  <div className="w-100">
                    <CustomInput
                      type="text"
                      placeholder="Apartment, suit, etc."
                      name="other"
                      id="other"
                      onChange={formik.handleChange("other")}
                      onBlur={formik.handleBlur("other")}
                      value={formik.values.other}
                    />
                    <div className="error ms-2">
                      {formik.touched.other && formik.errors.other}
                    </div>
                  </div>

                  <div className="flex-grow-md-1 w-100">
                    <CustomInput
                      type="text"
                      placeholder="City."
                      name="city"
                      id="city"
                      onChange={formik.handleChange("city")}
                      onBlur={formik.handleBlur("city")}
                      value={formik.values.city}
                    />
                    <div className="error ms-2">
                      {formik.touched.city && formik.errors.city}
                    </div>
                  </div>
                  <div className="flex-gorw-md-1 w-100">
                    <select
                      name="state"
                      className="form-control form-select shadow-none outline-none"
                      id="state"
                      onChange={formik.handleChange("state")}
                      onBlur={formik.handleBlur("state")}
                      value={formik.values.state}
                    >
                      <option disabled>Select State.</option>
                      <option value="Katani" selected>
                        Katani
                      </option>
                      <option value="Maseno" selected>
                        Maseno
                      </option>
                    </select>
                    <div className="error ms-2">
                      {formik.touched.state && formik.errors.state}
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <CustomInput
                      type="text"
                      placeholder="Pincode."
                      id="pincode"
                      name="pincode"
                      value={formik.values.pincode}
                      onChange={formik.handleChange("pincode")}
                      onBlur={formik.handleBlur("pincode")}
                    />
                    <div className="error ms-2">
                      {formik.touched.pincode && formik.errors.pincode}
                    </div>
                  </div>
                  <div className="w-100 my-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <Link to="/cart" className="text-dark">
                        <IoArrowBackSharp className="me-2" />
                        Return to cart
                      </Link>
                      <Link to="/" className="button">
                        Continue to shopping
                      </Link>
                    </div>
                  </div>
                </form>
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
                              alt="Product Image"
                            ></img>
                          </div>
                          <div>
                            <h5 className="total-price">{item?.title}</h5>
                            <h5 className="total-price">{item?.brand}</h5>
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
                  className="button signup border-0"
                  type="submit"
                  onClick={handlePlaceOrder}
                >
                  Place order
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
