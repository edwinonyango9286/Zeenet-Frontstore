import React from "react";

import Meta from "../Components/Meta";
import BreadCrump from "../Components/BreadCrumb";
import Container from "../Components/Container";
import CustomInput from "../Components/CustomInput";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, resetState } from "../features/users/userSlice";
import { toast } from "react-toastify";

const RESET_PASSWORD_SCHEMA = Yup.object().shape({
  password: Yup.string()
    .min(8)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must have a mix of upper and lowercase letters, atleast one number and a special character,"
    )
    .required(),
  confirmPassword: Yup.string()
    .min(8)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must have a mix of upper and lowercase letters, atleast one number and a special character,"
    )
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required(),
});

const ResetPassword = () => {
  const location = useLocation();
  const getToken = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: RESET_PASSWORD_SCHEMA,
    onSubmit: (values, { resetForm }) => {
      dispatch(resetState());
      dispatch(resetPassword({ token: getToken, password: values.password }));
      resetForm();
      navigate("/login");
    },
  });

  const message = useSelector((state) => state?.user?.message);
  const isError = useSelector((state) => state?.user?.isError?.resetPassword);

  const isLoading = useSelector((state) => state?.user?.resetPassword);

  return (
    <>
      <Meta title={"reset-password"} />
      <BreadCrump title="reset-password" />
      <Container class1="home-wrapper-2 py-4">
        <div className="row">
          <div className="col-12 d-flex items-center">
            <div className="auth-card">
              <h3 className="text-center mb-2">Reset password</h3>
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
                  type="password"
                  id="password"
                  name="password"
                  placeholder="New password"
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                  value={formik.values.password}
                />
                <div className="error">
                  {formik.touched.password && formik.errors.password}
                </div>
                <CustomInput
                  type="confirmPassword"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm  password"
                  onChange={formik.handleChange("confirmPassword")}
                  onBlur={formik.handleBlur("confirmPassword")}
                  value={formik.values.confirmPassword}
                />
                <div className="error">
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword}
                </div>

                <div className="mt-2 d-flex justify-content-center gap-15 align-items-center">
                  <button
                    className="button border-0"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "Reset Password"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ResetPassword;
