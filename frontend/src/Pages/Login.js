import React from "react";
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
  loginUser,
  resetState,
} from "../features/users/userSlice";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const LOGIN_SCHEMA = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string()
    .min(8)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must have a mix of upper and lowercase letters, atleast one number and a special character,"
    )
    .required(),
});

const Login = React.memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, userCart, isError, isLoading, isSuccess, message } =
    useSelector((state) => state.auth ?? {});
  const from =
    (location.state && location.state.from && location.state.from.pathname) ||
    "/store";

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LOGIN_SCHEMA,
    onSubmit: (values) => {
      dispatch(loginUser(values));
      if (isSuccess) {
        dispatch(getUserCart());
        navigate(from, { replace: true });
      }
    },
  });

  useEffect(() => {
    if (isError) {
      dispatch(resetState());
    }
  }, [dispatch]);

  return (
    <>
      <Meta title={"Login"} />
      <BreadCrump title="Login" />
      <Container class1="home-wrapper-2 py-4">
        <div className="row">
          <div className="col-12 d-flex items-center">
            <div className="auth-card">
              <h3 className="text-center ">Login</h3>
              <p className="text-center">Login to your account to continue.</p>
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

                <CustomInput
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password"
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                  value={formik.values.password}
                />
                <div className="error">
                  {formik.touched.password && formik.errors.password}
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
                    {isLoading ? "Logging in..." : "Login"}
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
});

export default Login;

// 359 016 381 122
// kQEKf9
