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
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  email: Yup.string().email().required(),
  phoneNumber: Yup.string()
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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
    validationSchema: SIGN_UP_SCHEMA,
    onSubmit: (values) => {
      dispatch(resetState());
      dispatch(registerUser(values));
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (isSuccess && createdUser) {
      formik.resetForm();
      dispatch(resetState());
      navigate("/signin");
    }
  }, [isSuccess, createdUser, formik, dispatch, navigate]);

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
              <form
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-10"
              >
                <CustomInput
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First name"
                  onChange={formik.handleChange("firstName")}
                  onBlur={formik.handleBlur("firstName")}
                  value={formik.values.firstName}
                />
                <div className="error">
                  {formik.touched.firstName && formik.errors.firstName}
                </div>

                <CustomInput
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  onChange={formik.handleChange("lastName")}
                  onBlur={formik.handleBlur("lastName")}
                  value={formik.values.lastName}
                />
                <div className="error">
                  {formik.touched.lastName && formik.errors.lastName}
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
                  name="phoneNumber"
                  id="phoneNumber"
                  max={0}
                  min={14}
                  placeholder="Phone number"
                  onChange={formik.handleChange("phoneNumber")}
                  onBlur={formik.handleBlur("phoneNumber")}
                  value={formik.values.phoneNumber}
                />
                <div className="error">
                  {formik.touched.phoneNumber && formik.errors.phoneNumber}
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
