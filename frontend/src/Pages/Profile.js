import React, { useState } from "react";
import BreadCrumb from "../Components/BreadCrumb";
import Container from "../Components/Container";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../features/users/userSlice";
import { FiEdit } from "react-icons/fi";

const profileSchema = Yup.object().shape({
  firstname: Yup.string().required("Enter your First Name."),
  lastname: Yup.string().required("Enter your Last Name."),
  email: Yup.string()
    .email("Enter a valid Email Address.")
    .required("Enter your Email Address."),
  mobile: Yup.string()
    .matches(/^(\+?254|0)?(7\d{8})$/, "Enter a valid phone number.")
    .required("Enter your Phone Number."),
});

const Profile = () => {
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

  const dispatch = useDispatch();
  const userState = useSelector((state) => state?.auth?.user);
  const [update, setUpdate] = useState(true);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: userState?.firstname,
      lastname: userState?.lastname,
      email: userState?.email,
      mobile: userState?.mobile,
    },
    validationSchema: profileSchema,  
    onSubmit: (values) => {
      dispatch(updateProfile({ data: values, config2: config2 }));
      setUpdate(true);
    },
  });

  return (
    <>
      <BreadCrumb title="My Profile" />
      <Container class1="home-wrapper-2 py-4 ">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
            <div className="d-flex justify-content-between align-items-center">
              <h4> {update === true ? "Your Profile" : "Update Profile"}</h4>
              {/* <FiEdit
                className=" fs-4 text-primary"
                onClick={() => setUpdate(false)}
              /> */}
            </div>

            <div>
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-2">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstname"
                    name="firstname"
                    aria-describedby="emailHelp"
                    value={formik.values.firstname}
                    onChange={formik.handleChange("firstname")}
                    onBlur={formik.handleBlur("firstname")}
                    disabled={update}
                  />
                  <div className="error">
                    {formik.touched.firstname && formik.errors.firstname}
                  </div>
                </div>
                <div className="mb-2">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastname"
                    name="lastname"
                    aria-describedby="emailHelp"
                    value={formik.values.lastname}
                    onChange={formik.handleChange("lastname")}
                    onBlur={formik.handleBlur("lastname")}
                    disabled={update}
                  />
                  <div className="error">
                    {formik.touched.lastname && formik.errors.lastname}
                  </div>
                </div>
                <div className="mb-2">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    aria-describedby="emailHelp"
                    value={formik.values.email}
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                    disabled={update}
                  />
                  <div className="error">
                    {formik.touched.email && formik.errors.email}
                  </div>
                </div>
                <div className="mb-2">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="mobile"
                    name="mobile"
                    aria-describedby="emailHelp"
                    value={formik.values.mobile}
                    onChange={formik.handleChange("mobile")}
                    onBlur={formik.handleBlur("mobile")}
                    disabled={update}
                  />
                  <div className="error">
                    {formik.touched.mobile && formik.errors.mobile}
                  </div>
                </div>
                {update === false && (
                  <button type="submit" className="button border-0">
                    Update
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Profile;
