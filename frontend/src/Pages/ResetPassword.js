import React from "react";

import Meta from "../Components/Meta";
import BreadCrump from "../Components/BreadCrumb";
import Container from "../Components/Container";
import CustomInput from "../Components/CustomInput";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../features/users/userSlice";

const resetPasswordSchema = Yup.object().shape({
  password: Yup.string().required("Enter a new password."),
});

const ResetPassword = () => {
  const location = useLocation();
  const getToken = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: (values) => {
      dispatch(resetPassword({ token: getToken, password: values.password }));
      navigate("/login");
    },
  });

  const { isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  return (
    <>
      <Meta title={"reset-password"} />
      <BreadCrump title="reset-password" />
      <Container class1="home-wrapper-2 py-4">
        <div className="row">
          <div className="col-12 d-flex items-center">
            <div className="auth-card">
              <h3 className="text-center mb-2">Reset password</h3>
              <form
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-10"
              >
                <CustomInput
                  type="password"
                  id="password"
                  name="password"
                  placeholder="New Password"
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                  value={formik.values.password}
                />
                <div className="error">
                  {formik.touched.password && formik.errors.password}
                </div>
                  <div className="mt-2 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0" type="submit" disabled={isLoading}>
                      {isLoading ? "Loading..." : "Reset Password"}
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
