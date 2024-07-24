import React from "react";
import Meta from "../Components/Meta";
import BreadCrump from "../Components/BreadCrumb";
import { Link } from "react-router-dom";
import Container from "../Components/Container";
import CustomInput from "../Components/CustomInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { resetPasswordToken } from "../features/users/userSlice";

const forgetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email.")
    .required("Enter your email address."),
});

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgetPasswordSchema,
    onSubmit: (values) => {
      dispatch(resetPasswordToken(values));
    },
  });

  return (
    <>
      <Meta title={"forgot password"} />
      <BreadCrump title="Forgot Passsword" />
      <Container class1="forgot-passwrod-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Reset Your Password</h3>
              <p className="text-center mt-2 mb-3">
                We will send you an email to reset your password.
              </p>
              <form
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-10"
              >
                <div className="col-12">
                  <CustomInput
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                    value={formik.values.email}
                    className="mw-100"
                  />
                  <div className="error">
                    {formik.touched.email && formik.errors.email}
                  </div>
                </div>


                <div className="mt-3 d-flex justify-content-center flex-column gap-10 align-items-center">
                  <button className="button border-0" type="submit">
                    Submit
                  </button>
                  <Link to="/login">Cancel</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ForgotPassword;
