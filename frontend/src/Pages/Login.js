import React from "react";
import Meta from "../Components/Meta";
import BreadCrump from "../Components/BreadCrumb";
import { Link } from "react-router-dom";
import Container from "../Components/Container";
import CustomInput from "../Components/CustomInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { getUserCart, loginUser } from "../features/users/userSlice";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email.")
    .required("Enter your email address."),
  password: Yup.string().required("Enter your password"),
});

const Login = () => {

    const getTokenFromLocalStorge = localStorage.getItem("customer")
      ? JSON.parse(localStorage.getItem("customer"))
      : null;

    const config2 = {
      headers: {
        Authorization: `Bearer ${
          getTokenFromLocalStorge !== null ? getTokenFromLocalStorge.token : ""
        }`,
        Accept: "application/json",
      },
    };
  const authState = useSelector((state) => state?.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const from = location.state?.from?.pathname || "/store";
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values));

      if (authState.isSuccess) {
        dispatch(getUserCart(config2))
        navigate(from, { replace: true });
      }
    },
  });

  useEffect(() => {
    if (authState.user !== null && authState.isError === false) {
      navigate(from, { replace: true });
      window.location.reload();
    }
  }, [authState]);

  return (
    <>
      <Meta title={"Login"} />
      <BreadCrump title="Login" />
      <Container class1="home-wrapper-2 py-4">
        <div className="row">
          <div className="col-12 d-flex items-center">
            <div className="auth-card">
              <h3 className="text-center mb-2">Login</h3>
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
                  <Link to="/forgot-password">Forgot Your Password?</Link>
                </div>
                <div className="mt-2 d-flex justify-content-center gap-15 align-items-center">
                  <button className="button border-0 " type="submit">
                    Login
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

export default Login;
