import React from "react";
import Meta from "../Components/Meta";
import BreadCrump from "../Components/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import Container from "../Components/Container";
import CustomInput from "../Components/CustomInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/users/userSlice";
import { useEffect } from "react";

const signUpschema = Yup.object().shape({
  firstname: Yup.string().required("Enter your first name."),
  lastname: Yup.string().required("Enter your Last name is."),
  email: Yup.string()
    .email("Enter a valid email.")
    .required("Enter your email address."),
  mobile: Yup.string()
    .matches(/^(\+?254|0)?(7\d{8})$/, "Enter a valid phone number.")
    .required("Enter your Phone Number."),
  password: Yup.string().required("Enter your password."),
});

const Signup = () => {
  const { user, userCart, isError, isLoading, isSuccess, message } =
    useSelector((state) => state?.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      password: "",
    },
    validationSchema: signUpschema,
    onSubmit: (values) => {
      dispatch(registerUser(values));
    },
  });

  useEffect(() => {
    if (user && isError === false) {
      navigate("/login");
    }
  }, [user, navigate, isError]);

  return (
    <>
      <Meta title={"signup"} />
      <BreadCrump title="signup" />
      <Container class1="home-wrapper-2 py-4">
        <div className="row">
          <div className="col-12 d-flex items-center">
            <div className="auth-card">
              <h3 className="text-center mb-2">Sign Up</h3>
              <form
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-10"
              >
                <CustomInput
                  type="text"
                  name="firstname"
                  placeholder="First Name"
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
                  placeholder="Last Name"
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
                  name="mobile"
                  max={0}
                  min={14}
                  placeholder="Mobile Number"
                  onChange={formik.handleChange("mobile")}
                  onBlur={formik.handleBlur("mobile")}
                  value={formik.values.mobile}
                />
                <div className="error">
                  {formik.touched.mobile && formik.errors.mobile}
                </div>
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                  value={formik.values.password}
                />
                <div className="error">
                  {formik.touched.password && formik.errors.password}
                </div>

                <div className="mt-2 d-flex justify-content-center gap-15 align-items-center">
                  <button type="submit" className="button border-0">
                    {isLoading ? "Loading..." : "Sign Up"}
                  </button>
                  <Link to="/login" className="button signup ">
                    Login
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
