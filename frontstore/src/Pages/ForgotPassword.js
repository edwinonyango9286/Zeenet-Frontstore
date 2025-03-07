import React from "react";
import Meta from "../Components/Meta";
import BreadCrump from "../Components/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import Container from "../Components/Container";
import CustomInput from "../Components/CustomInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  resetUserPasswordToken,
  resetState,
} from "../features/users/userSlice";

const FORGOT_PASSWORD_SCHEMA = Yup.object().shape({
  email: Yup.string().email().required(),
});

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSuccess = useSelector(
    (state) => state?.user?.isSuccess?.resetUserPasswordToken
  );
  const isLoading = useSelector(
    (state) => state?.user?.isLoading?.resetUserPasswordToken
  );

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: FORGOT_PASSWORD_SCHEMA,
    onSubmit: (values, { resetForm }) => {
      dispatch(resetState());
      dispatch(resetUserPasswordToken(values));
      if (isSuccess) {
        resetForm();
        navigate("/signin");
        dispatch(resetState());
      }
    },
  });

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
                      "Submit"
                    )}
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
