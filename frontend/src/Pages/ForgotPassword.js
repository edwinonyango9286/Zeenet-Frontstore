import React, { useEffect } from "react";
import Meta from "../Components/Meta";
import BreadCrump from "../Components/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import Container from "../Components/Container";
import CustomInput from "../Components/CustomInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordToken, resetState } from "../features/users/userSlice";

const FORGOT_PASSWORD_SCHEMA = Yup.object().shape({
  email: Yup.string().email().required(),
});

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const message = useSelector((state) => state?.user.message);
  const isError = useSelector(
    (state) => state.user?.isError?.resetPasswordToken
  );
  const isSuccess = useSelector(
    (state) => state?.user?.isSuccess?.resetPasswordToken
  );
  const isLoading = useSelector(
    (state) => state?.user?.isLoading?.resetPasswordToken
  );
  const resetToken = useSelector((state) => state?.user?.resetToken);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: FORGOT_PASSWORD_SCHEMA,
    onSubmit: (values, { resetForm }) => {
      dispatch(resetState());
      dispatch(resetPasswordToken(values));
      if (isSuccess && resetToken) {
        resetForm();
        navigate("/signin");
        dispatch(resetState());
      }
    },
  });

  useEffect(() => {
    if (isError && message) {
      setTimeout(() => {
        dispatch(resetState());
      }, 10000);
    }
  }, [isError, message]);

  return (
    <>
      <Meta title={"forgot password"} />
      <BreadCrump title="forgot passsword" />
      <Container class1="home-wrapper-2 py-4">
        <div className="row">
          <div className="col-12 d-flex items-center">
            <div className="auth-card">
              <h3 className="text-center mb-2">Reset your password</h3>
              <p className="text-center mt-3 mb-3">
                We will send you an email to reset your password.
              </p>

              <div className="error text-center">
                {isError && message
                  ? message || "Something went wrong. Please try again later."
                  : ""}
              </div>
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
                  />
                  <div className="error">
                    {formik.touched.email && formik.errors.email}
                  </div>
                </div>

                <div className="mt-3 d-flex justify-content-center flex-column gap-10 align-items-center">
                  <button
                    className="button border-0"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "Submit"}
                  </button>
                  <Link to="/signin">Cancel</Link>
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
