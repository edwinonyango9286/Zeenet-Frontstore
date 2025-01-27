import React, { useEffect } from "react";
import BreadCrumb from "../Components/BreadCrumb";
import Meta from "../Components/Meta";
import { AiTwotoneHome, AiTwotoneMail } from "react-icons/ai";
import { BsTelephoneFill, BsFillInfoCircleFill } from "react-icons/bs";
import Container from "../Components/Container";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { createEnquiry, resetState } from "../features/contact/contactSlice";
import CustomInput from "../Components/CustomInput";

let contactSchema = Yup.object().shape({
  name: Yup.string().required("Please provide your name"),
  email: Yup.string().email().required("Please provide your email."),
  phoneNumber: Yup.string()
    .matches(/^\+?[0-9]\d{1,14}$/, "Please provide a valid phone number.")
    .required("Please provide your phone number."),
  enquiry: Yup.string().required("Please provide your eunquiry."),
});

const Contact = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(
    (state) => state.contact.isLoading.createEnquiry
  );
  const createdEnquiry = useSelector((state) => state.contact.createdEnquiry);
  const isSuccess = useSelector(
    (state) => state.contact.isSuccess.createEnquiry
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      enquiry: "",
    },
    validationSchema: contactSchema,
    onSubmit: (values) => {
      dispatch(resetState());
      dispatch(createEnquiry(values));
    },
  });

  useEffect(() => {
    if (isSuccess && createdEnquiry) {
      formik.resetForm();
      dispatch(resetState());
    }
  }, [isSuccess, createdEnquiry, dispatch]);

  return (
    <>
      <Meta title={"Contact Us"} />
      <BreadCrumb title="Contact Us" />
      <Container class1="py-4 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <iframe
              title="Google map showing physical location of our shop."
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54952.62173316973!2d36.79491909941817!3d-1.3028984515834783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d671900001%3A0x90f5e610e51dce23!2sKimathi%20House!5e0!3m2!1sen!2ske!4v1728286391627!5m2!1sen!2ske"
              width="600"
              height="450"
              className="border-0 w-100 "
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className=" col-12 my-4 contact-inner-wrapper d-flex gap-4 flex-wrap flex-sm-nowrap">
            <div className="col-12 col-sm-6">
              <h3 className="contact-title mb-2">Contact</h3>
              <form
                onSubmit={formik.handleSubmit}
                className="d-flex align flex-column gap-10"
              >
                <div className="mb-2">
                  <CustomInput
                    type="text"
                    placeholder="Name"
                    name="name"
                    id="name"
                    onChange={formik.handleChange("name")}
                    onBlur={(e) => {
                      formik.setFieldValue(
                        "name",
                        e.target.value
                          .toLowerCase()
                          .split(" ")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")
                      );
                      formik.handleBlur(e);
                    }}
                    value={formik.values.name}
                  />
                  <div className="error">
                    {formik.touched.name && formik.errors.name}
                  </div>
                </div>
                <div className="mb-2">
                  <CustomInput
                    type="email"
                    placeholder="Email"
                    id="email"
                    name="email"
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                    value={formik.values.email}
                  />
                  <div className="error">
                    {formik.touched.email && formik.errors.email}
                  </div>
                </div>
                <div className="mb-2">
                  <CustomInput
                    type="tel"
                    placeholder="Phone number"
                    id="phoneNumber"
                    name="phoneNumber"
                    onChange={formik.handleChange("phoneNumber")}
                    onBlur={formik.handleBlur("phoneNumber")}
                    value={formik.values.phoneNumber}
                  />
                  <div className="error">
                    {formik.touched.phoneNumber && formik.errors.phoneNumber}
                  </div>
                </div>

                <div className="mb-2">
                  <textarea
                    className=" form-control border rounded-md shadow-none"
                    name="enquiry"
                    id="enquiry"
                    cols={30}
                    rows={4}
                    placeholder="Enquiry"
                    onChange={formik.handleChange("enquiry")}
                    onBlur={(e) => {
                      formik.setFieldValue(
                        "enquiry",
                        e.target.value
                          .split(/(?<=\.\s|\n)/) // Split by sentence delimiters like ". " or newline
                          .map(
                            (sentence) =>
                              sentence.charAt(0).toUpperCase() +
                              sentence.slice(1).toLowerCase()
                          )
                          .join("")
                          .trim()
                      );
                      formik.handleBlur(e);
                    }}
                    value={formik.values.enquiry}
                  />
                  <div className="error">
                    {formik.touched.enquiry && formik.errors.enquiry}
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="button border-0"
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
                </div>
              </form>
            </div>

            <div className=" col-12 col-sm-6 ">
              <h3 className="contact-title"> Get in touch with us.</h3>

              <div>
                <ul className="ps-0 d-flex flex-column gap-10 ">
                  <li className="mb-2 d-flex align-items-center  gap-10">
                    <AiTwotoneHome className="fs-6" />
                    <address className="mb-0">
                      Address : Moi Avenue Bazaar Plaza 7th Floor, Crystal
                      Suites,
                    </address>
                  </li>
                  <li className="mb-2 d-flex align-items-center gap-10">
                    <BsTelephoneFill className="fs-6" />
                    <a href="tel:+254 0719547267">Phone : +254 0719547267</a>
                  </li>

                  <li className="mb-2 d-flex align-items-center gap-10">
                    <AiTwotoneMail className="fs-6" />
                    <a href="mailto:technologieszeenet@gmail.com">
                      Email : technologieszeenet@gmail.com
                    </a>
                  </li>

                  <li className="mb-2 d-flex align-items-center gap-10">
                    <BsFillInfoCircleFill className="fs-6" />
                    <p className="mb-0">Monday To Sunday 6am to 8pm </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Contact;
