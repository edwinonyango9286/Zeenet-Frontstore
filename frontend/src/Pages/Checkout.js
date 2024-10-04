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

const SHIPPINGSCHEMA = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  email: Yup.string().email().required(),
  phone: Yup.string()
    .matches(/^(\+?254|0)?(7\d{8})$/, "Please provide a valid phone nummber.")
    .required(),
  address: Yup.string().required(),
  town: Yup.string().required(),
  other: Yup.string().required(),
  state: Yup.string().required(),
  county: Yup.string().required(),
});

const Checkout = () => {
  const dispatch = useDispatch();
  const userCart = useSelector((state) => state?.user?.userCart);
  const user = useSelector((state) => state?.user?.user);
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
      firstName: user?.firstname || "",
      lastName: user?.lastname || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
      county: "",
      town: "",
      country: "",
    },

    validationSchema: SHIPPINGSCHEMA,
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
                  Delivery information
                </h6>
                <form
                  className="d-flex gap-2 flex-wrap flex-column flex-md-row justify-content-between gap-2"
                  onSubmit={formik.handleSubmit}
                >
                  <div className="w-100">
                    <CustomInput
                      type="type"
                      placeholder="First name."
                      name="firstName"
                      id="firstName"
                      onChange={formik.handleChange("firstName")}
                      onBlur={formik.handleBlur("firstName")}
                      value={formik.values.firstName}
                    />
                    <div className="error ms-2">
                      {formik.touched.firstName && formik.errors.firstName}
                    </div>
                  </div>

                  <div className="w-100">
                    <CustomInput
                      type="text"
                      placeholder="Last name."
                      name="lastname"
                      id="lastname"
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
                      type="email"
                      placeholder="Email."
                      name="email"
                      id="email"
                      onChange={formik.handleChange("email")}
                      onBlur={formik.handleBlur("email")}
                      value={formik.values.email}
                    />
                    <div className="error ms-2">
                      {formik.touched.email && formik.errors.email}
                    </div>
                  </div>

                  <div className="w-100">
                    <CustomInput
                      type="tel"
                      name="phone"
                      max={0}
                      min={14}
                      placeholder="Phone number"
                      onChange={formik.handleChange("phone")}
                      onBlur={formik.handleBlur("phone")}
                      value={formik.values.phone}
                    />
                    <div className="error ms-2">
                      {formik.touched.phone && formik.errors.phone}
                    </div>
                  </div>

                  <div className="w-100">
                    <select
                      name="county"
                      className="form-control form-select shadow-none outline-none"
                      id="county"
                      onChange={formik.handleChange("county")}
                      onBlur={formik.handleBlur("county")}
                      value={formik.values.county}
                    >
                      <option disabled>Select your county.</option>
                      <option value="Baringo">Baringo</option>
                      <option value="Bomet">Bomet</option>
                      <option value="Bungoma">Bungoma</option>
                      <option value="Busia">Busia</option>
                      <option value="Elgeyo-Marakwet">Elgeyo-Marakwet</option>
                      <option value="Embu">Embu</option>
                      <option value="Garissa">Garissa</option>
                      <option value="Homa Bay">Homa Bay</option>
                      <option value="Isiolo">Isiolo</option>
                      <option value="Kajiado">Kajiado</option>
                      <option value="Kakamega">Kakamega</option>
                      <option value="Kericho">Kericho</option>
                      <option value="Kiambu">Kiambu</option>
                      <option value="Kilifi">Kilifi</option>
                      <option value="Kirinyaga">Kirinyaga</option>
                      <option value="Kisii">Kisii</option>
                      <option value="Kisumu">Kisumu</option>
                      <option value="Kitui">Kitui</option>
                      <option value="Kwale">Kwale</option>
                      <option value="Laikipia">Laikipia</option>
                      <option value="Lamu">Lamu</option>
                      <option value="Machakos">Machakos</option>
                      <option value="Makueni">Makueni</option>
                      <option value="Mandera">Mandera</option>
                      <option value="Marsabit">Marsabit</option>
                      <option value="Meru">Meru</option>
                      <option value="Migori">Migori</option>
                      <option value="Mombasa">Mombasa</option>
                      <option value="Murang'a">Murang'a</option>
                      <option value="Nairobi">Nairobi</option>
                      <option value="Nakuru">Nakuru</option>
                      <option value="Nandi">Nandi</option>
                      <option value="Narok">Narok</option>
                      <option value="Nyamira">Nyamira</option>
                      <option value="Nyandarua">Nyandarua</option>
                      <option value="Nyeri">Nyeri</option>
                      <option value="Samburu">Samburu</option>
                      <option value="Siaya">Siaya</option>
                      <option value="Taita Taveta">Taita Taveta</option>
                      <option value="Tana River">Tana River</option>
                      <option value="Tharaka Nithi">Tharaka Nithi</option>
                      <option value="Trans-Nzoia">Trans-Nzoia</option>
                      <option value="Turkana">Turkana</option>
                      <option value="Uasin Gishu">Uasin Gishu</option>
                      <option value="Vihiga">Vihiga</option>
                      <option value="Wajir">Wajir</option>
                      <option value="West Pokot">West Pokot</option>
                    </select>
                    <div className="error ms-2">
                      {formik.touched.county && formik.errors.county}
                    </div>
                  </div>

                  <div className="w-100">
                    <select
                      name="town"
                      className="form-control form-select shadow-none outline-none"
                      id="town"
                      onChange={formik.handleChange("town")}
                      onBlur={formik.handleBlur("town")}
                      value={formik.values.town}
                    >
                      <option disabled>Select nearest town.</option>
                      <option value="Nairobi">Nairobi</option>
                      <option value="Mombasa">Mombasa</option>
                      <option value="Nakuru">Nakuru</option>
                      <option value="Naivasha">Naivasha</option>
                      <option value="Thika">Thika</option>
                      <option value="Mwala">Mwala</option>
                      <option value="Eldoret">Eldoret</option>
                      <option value="Kajiado">Kajiado</option>
                      <option value="Meru">Meru</option>
                      <option value="Machakos">Machakos</option>
                      <option value="Kisumu">Kisumu</option>
                      <option value="Embu">Embu</option>
                      <option value="Nyeri">Nyeri</option>
                      <option value="Kitale">Kitale</option>
                      <option value="Kericho">Kericho</option>
                      <option value="Kakamega">Kakamega</option>
                      <option value="Narok">Narok</option>
                      <option value="Malindi">Malindi</option>
                      <option value="Garissa">Garissa</option>
                      <option value="Isiolo">Isiolo</option>
                      <option value="Busia">Busia</option>
                      <option value="Kilifi">Kilifi</option>
                      <option value="Voi">Voi</option>
                      <option value="Lamu">Lamu</option>
                      <option value="Marsabit">Marsabit</option>
                      <option value="Wajir">Wajir</option>
                      <option value="Nanyuki">Nanyuki</option>
                      <option value="Lodwar">Lodwar</option>
                      <option value="Moyale">Moyale</option>
                      <option value="Siaya">Siaya</option>
                      <option value="Bungoma">Bungoma</option>
                      <option value="Homa Bay">Homa Bay</option>
                      <option value="Migori">Migori</option>
                      <option value="Mandera">Mandera</option>
                      <option value="Tharaka Nithi">Tharaka Nithi</option>
                      <option value="Nyamira">Nyamira</option>
                      <option value="Kapsabet">Kapsabet</option>
                      <option value="Chuka">Chuka</option>
                      <option value="Maralal">Maralal</option>
                      <option value="Bomet">Bomet</option>
                      <option value="Iten">Iten</option>
                      <option value="Kwale">Kwale</option>
                      <option value="Kimilili">Kimilili</option>
                      <option value="Litein">Litein</option>
                      <option value="Runyenjes">Runyenjes</option>
                      <option value="Sotik">Sotik</option>
                      <option value="Keroka">Keroka</option>
                      <option value="Mwingi">Mwingi</option>
                      <option value="Taveta">Taveta</option>
                      <option value="Mukurweini">Mukurweini</option>
                      <option value="Kangundo">Kangundo</option>
                      <option value="Tala">Tala</option>
                      <option value="Ongata Rongai">Ongata Rongai</option>
                      <option value="Limuru">Limuru</option>
                      <option value="Ruiru">Ruiru</option>
                      <option value="Kiambu">Kiambu</option>
                      <option value="Gatundu">Gatundu</option>
                      <option value="Karatina">Karatina</option>
                      <option value="Othaya">Othaya</option>
                      <option value="Nyahururu">Nyahururu</option>
                      <option value="Kendu Bay">Kendu Bay</option>
                      <option value="Teso">Teso</option>
                      <option value="Sotik">Sotik</option>
                    </select>
                    <div className="error ms-2">
                      {formik.touched.town && formik.errors.town}
                    </div>
                  </div>

                  <div className="w-100">
                    <select
                      name="state"
                      className="form-control form-select shadow-none outline-none"
                      id="state"
                      onChange={formik.handleChange("state")}
                      onBlur={formik.handleBlur("state")}
                      value={formik.values.state}
                    >
                      <option disabled>Select Pick up station.</option>
                      <option value="Nairobi Central">Nairobi Central</option>
                      <option value="Mombasa City Center">
                        Mombasa City Center
                      </option>
                      <option value="Nakuru CBD">Nakuru CBD</option>
                      <option value="Eldoret Town">Eldoret Town</option>
                      <option value="Kisumu City Square">
                        Kisumu City Square
                      </option>
                      <option value="Meru Plaza">Meru Plaza</option>
                      <option value="Kajiado Junction">Kajiado Junction</option>
                      <option value="Nyeri Main Market">
                        Nyeri Main Market
                      </option>
                      <option value="Machakos Town Hall">
                        Machakos Town Hall
                      </option>
                      <option value="Kakamega Town Center">
                        Kakamega Town Center
                      </option>
                      <option value="Bungoma Market Square">
                        Bungoma Market Square
                      </option>
                      <option value="Thika Superhighway">
                        Thika Superhighway
                      </option>
                      <option value="Embu Town Park">Embu Town Park</option>
                      <option value="Garissa Central">Garissa Central</option>
                      <option value="Narok Town">Narok Town</option>
                      <option value="Homa Bay Waterfront">
                        Homa Bay Waterfront
                      </option>
                      <option value="Kirinyaga Town Center">
                        Kirinyaga Town Center
                      </option>
                      <option value="Lamu Island Center">
                        Lamu Island Center
                      </option>
                      <option value="Meru County Hall">Meru County Hall</option>
                      <option value="Migori Town Hall">Migori Town Hall</option>
                      <option value="Siaya Town Center">
                        Siaya Town Center
                      </option>
                      <option value="Vihiga Town">Vihiga Town</option>
                      <option value="Nyamira Central">Nyamira Central</option>
                      <option value="Nandi Hills">Nandi Hills</option>
                      <option value="Trans Nzoia Town Center">
                        Trans Nzoia Town Center
                      </option>
                      <option value="Laikipia Plaza">Laikipia Plaza</option>
                      <option value="West Pokot County Hall">
                        West Pokot County Hall
                      </option>
                      <option value="Bomet Town">Bomet Town</option>
                      <option value="Kericho Town Square">
                        Kericho Town Square
                      </option>
                      <option value="Uasin Gishu Central">
                        Uasin Gishu Central
                      </option>
                      <option value="Bungoma Town">Bungoma Town</option>
                      <option value="Kitui Town Center">
                        Kitui Town Center
                      </option>
                      <option value="Nairobi Westlands">
                        Nairobi Westlands
                      </option>
                      <option value="Kajiado Town Square">
                        Kajiado Town Square
                      </option>
                      <option value="Isiolo Town">Isiolo Town</option>
                      <option value="Samburu County Center">
                        Samburu County Center
                      </option>
                      <option value="Kilifi Town">Kilifi Town</option>
                      <option value="Nakuru East">Nakuru East</option>
                      <option value="Kilifi Coast">Kilifi Coast</option>
                      <option value="Taita Taveta Center">
                        Taita Taveta Center
                      </option>
                      <option value="Elgeyo Marakwet Town">
                        Elgeyo Marakwet Town
                      </option>
                      <option value="Lamu County Center">
                        Lamu County Center
                      </option>
                      <option value="Nyandarua Town">Nyandarua Town</option>
                      <option value="Murang'a Town">Murang'a Town</option>
                      <option value="Makueni County Hall">
                        Makueni County Hall
                      </option>
                      <option value="Nairobi Riverside">
                        Nairobi Riverside
                      </option>
                      <option value="Narok Town Center">
                        Narok Town Center
                      </option>
                      <option value="Vihiga County Hall">
                        Vihiga County Hall
                      </option>
                      <option value="Embu Town Center">Embu Town Center</option>
                    </select>
                    <div className="error ms-2">
                      {formik.touched.state && formik.errors.state}
                    </div>
                  </div>

                  <div className="w-100 my-2">
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
