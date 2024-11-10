import React, { useState } from "react";
import Meta from "../Components/Meta";
import BreadCrump from "../Components/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import Container from "../Components/Container";
import CustomInput from "../Components/CustomInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, resetState } from "../features/users/userSlice";
import { useEffect } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const SIGN_UP_SCHEMA = Yup.object().shape({
  firstname: Yup.string().required(),
  lastname: Yup.string().required(),
  email: Yup.string().email().required(),
  phone: Yup.string()
    .matches(/^(\+?254|0)?(7\d{8})$/, "Please provide a valid phone nummber.")
    .required(),
  password: Yup.string()
    .min(8)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must have a mix of upper and lowercase letters, atleast one number and a special character,"
    )
    .required(),
});

const Signup = () => {
  const createdUser = useSelector((state) => state?.user?.createdUser);
  const isSuccess = useSelector((state) => state.user?.isSuccess?.registerUser);
  const isLoading = useSelector((state) => state.user?.isLoading?.registerUser);
  const isError = useSelector((state) => state.user?.isError?.registerUser);
  const message = useSelector((state) => state?.user?.message);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema: SIGN_UP_SCHEMA,
    onSubmit: (values, { resetForm }) => {
      dispatch(resetState());
      dispatch(registerUser(values));
      resetForm();
    },
  });
  useEffect(() => {
    if (isSuccess && createdUser) {
      navigate("/signin");
    }
    if (isError && message) {
      setTimeout(() => {
        dispatch(resetState());
      }, 10000);
    }
  }, [isSuccess, createdUser, isError, message]);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Meta title={"signup"} />
      <BreadCrump title="signup" />
      <Container class1="home-wrapper-2 py-4">
        <div className="row">
          <div className="col-12 d-flex items-center">
            <div className="auth-card">
              <h3 className="text-center">Sign Up</h3>
              <p className="text-center">Sign up to continue.</p>
              <div className="error text-center mb-2">
                {isError && message
                  ? message || "Something went wrong. Please try again later."
                  : ""}
              </div>
              <form
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-10"
              >
                <CustomInput
                  type="text"
                  name="firstname"
                  placeholder="First name"
                  onChange={formik.handleChange("firstname")}
                  onBlur={formik.handleBlur("firstname")}
                  value={formik.values.firstname}
                />
                <div className="error">
                  {formik.touched.firstname && formik.errors.firstname}
                </div>

                <CustomInput
                  type="text"
                  name="lastname"
                  placeholder="Last name"
                  onChange={formik.handleChange("lastname")}
                  onBlur={formik.handleBlur("lastname")}
                  value={formik.values.lastname}
                />
                <div className="error">
                  {formik.touched.lastname && formik.errors.lastname}
                </div>
                <CustomInput
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  value={formik.values.email}
                />
                <div className="error">
                  {formik.touched.email && formik.errors.email}
                </div>

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
                <div className="error">
                  {formik.touched.phone && formik.errors.phone}
                </div>

                <div className="position-relative z-index-4 d-flex flex-column mb-2 gap-2 md-mb-4 ">
                  <CustomInput
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={formik.handleChange("password")}
                    onBlur={formik.handleBlur("password")}
                    value={formik.values.password}
                  />

                  <button
                    type="button"
                    onClick={handleShowPassword}
                    className="position-absolute d-flex flex-row  border-0  bg-transparent"
                    style={{
                      top: "10px",
                      right: "10px",
                    }}
                  >
                    {showPassword ? (
                      <MdVisibility className="flex-shrink-0" />
                    ) : (
                      <MdVisibilityOff className="flex-shrink-0" />
                    )}
                  </button>
                  <div className="error">
                    {formik.touched.password && formik.errors.password}
                  </div>
                </div>

                <div className="mt-2 d-flex justify-content-center gap-15 align-items-center">
                  <button
                    type="submit"
                    className="button border-0"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="d-flex flex-row gap-1 align-items-center">
                        <span
                          class="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        <span> Signing up...</span>
                      </div>
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                  <Link to="/signin" className="button signup ">
                    Sign In
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Signup;
