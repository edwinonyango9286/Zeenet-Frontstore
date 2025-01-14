import React, { useState } from "react";
import Meta from "../Components/Meta";
import BreadCrump from "../Components/BreadCrumb";
import { Link } from "react-router-dom";
import Container from "../Components/Container";
import CustomInput from "../Components/CustomInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import {
  getUserCart,
  signinUser,
  resetState,
} from "../features/users/userSlice";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const SIGNIN_SCHEMA = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string()
    .min(8)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must have a mix of upper and lowercase letters, atleast one number and a special character,"
    )
    .required(),
});

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state?.user?.user);
  const isSuccess = useSelector((state) => state?.user?.isSuccess?.signinUser);
  const isLoading = useSelector((state) => state?.user?.isLoading?.signinUser);
  const from =
    (location?.state &&
      location?.state.from &&
      location?.state?.from?.pathname) ||
    "/store";

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SIGNIN_SCHEMA,
    onSubmit: (values, { resetForm }) => {
      dispatch(resetState());
      dispatch(signinUser(values));
      if (isSuccess && user) {
        resetForm();
        dispatch(getUserCart());
        navigate(from, { replace: true });
      }
    },
  });

  useEffect(() => {
    if (isSuccess && user) {
      formik.resetForm();
      navigate(from, { replace: true });
    }
  }, [isSuccess, user, navigate, from, formik]);

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Meta title={"Signin"} />
      <BreadCrump title="Signin" />
      <Container class1="home-wrapper-2 py-4">
        <div className="row">
          <div className="col-12 d-flex items-center">
            <div className="auth-card">
              <h3 className="text-center ">Sign In</h3>
              <p className="text-center">Signin to your account to continue.</p>
              <form
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-10"
              >
                <CustomInput
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  value={formik.values.email}
                />
                <div className="error">
                  {formik.touched.email && formik.errors.email}
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

                <div>
                  <Link to="/forgot-password">Forgot your password?</Link>
                </div>
                <div className="mt-2 d-flex justify-content-center gap-15 align-items-center">
                  <button
                    className="button border-0 "
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="d-flex flex-row gap-1 align-items-center justify-content-center">
                        <span
                          class="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        <span>Please wait...</span>
                      </div>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                  <Link to="/signup" className="button signup">
                    Sign Up
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

export default Signin;
