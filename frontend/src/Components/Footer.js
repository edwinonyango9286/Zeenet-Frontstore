import React from "react";
import newsletterImage from "../images/newsletter.png";
import googlePlayStoreBadge from "../images/google playstore badge.png";
import appStoreBadge from "../images/app store badge.png";
import { Link } from "react-router-dom";
import { BsLinkedin, BsInstagram, BsGithub, BsYoutube } from "react-icons/bs";
import mpesaBadge from "../images/Mpesa logo best.png";
import kcbBadge from "../images/kcb logo.png";
import airtelMoneyBadge from "../images/airtel-logo  best.jpg";

const Footer = () => {
  return (
    <>
      <footer className="container-fluid py-4 overflow-hidden">
        <div className="row">
          <div className="col-12 d-flex justify-content-between flex-wrap">
            <div className="col-6">
              <div className="footer-top-data d-flex gap-30 align-items-center">
                <img
                  src={newsletterImage}
                  className="img-fluid"
                  alt="News letter"
                  loading="lazy"
                />
                <h5 className="mb-0 text-white newsLetter">
                  Sign Up for Newsletter
                </h5>
              </div>
            </div>

            <div className="col-6">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-1 footer-text"
                  placeholder="Email address."
                  aria-label="Your Email Address"
                  aria-describedby="basic-addon2"
                  style={{
                    boxShadow: "none",
                    outline: "none",
                  }}
                />
                <span
                  className="input-group-text p-1 footer-text rounded-md"
                  id="basic-addon2"
                >
                  Subscribe
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <footer className="container-fluid p-4 overflow-hidden">
        <div className="row">
          <div className="col-12 d-flex justify-content-between flex-wrap gap-10">
            <div>
              <h5 className="text-white mb-2">Contact Us</h5>
              <p className="text-white py-1 footer-text">
                Address : Moi Avenue Bazaar
              </p>
              <p className=" text-white footer-text">
                Plaza 7th Floor, Crystal Suites,
              </p>
              <p className=" text-white footer-text"> Suite 718, Nairobi</p>
              <a
                href="tel:+2540719547267"
                className="text-white d-block  d-block footer-text py-1"
              >
                Phone : +254 0719547267
              </a>
              <a
                href="mailto:technologieszeenet@gmail.com"
                className="text-white d-block mt-2 d-block footer-text"
              >
                Email : technologieszeenet@gmail.com
              </a>
              <div className="social-icons d-flex align-items-center gap-20 mt-4">
                <a className="text-white" to="#">
                  <BsLinkedin className="fs-6" />
                </a>
                <a className="text-white" to="#">
                  <BsInstagram className="fs-6" />
                </a>
                <a className="text-white" to="#">
                  <BsYoutube className="fs-6" />
                </a>
                <a className="text-white" to="#">
                  <BsGithub className="fs-6" />
                </a>
              </div>
            </div>

            <div>
              <h5 className="text-white mb-2 ">Information</h5>
              <div className="footer-links d-flex flex-column">
                <Link
                  to="/privacy-policy"
                  className="text-white py-1  footer-text "
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/refund-policy"
                  className="text-white py-1 footer-text  "
                >
                  Refund Policy
                </Link>
                <Link
                  to="/shipping-policy"
                  className="text-white py-1 footer-text "
                >
                  Shipping Policy
                </Link>
                <Link
                  to="/terms-and-conditions"
                  className="text-white py-1 footer-text "
                >
                  Terms & Conditions
                </Link>
                <Link to="/blogs" className="text-white footer-text py-1">
                  Blogs
                </Link>
              </div>
            </div>

            <div>
              <h5 className="text-white mb-2">Account</h5>
              <div className="footer-links d-flex flex-column justify-content-between">
                <Link to="/about" className="text-white footer-text py-1  ">
                  About
                </Link>
                <Link className="text-white footer-text py-1">FQA</Link>
                <Link to="/contact" className=" text-white  footer-text py-1 ">
                  Contact
                </Link>
              </div>
            </div>

            <div>
              <h5 className="text-white mb-2">Quick Links</h5>
              <div className="footer-links d-flex flex-column">
                <Link className="text-white py-1 mb-1 footer-text ">
                  Laptops
                </Link>
                <Link className="text-white  py-1 mb-1 footer-text ">
                  Headphones
                </Link>
                <Link className="text-white  py-1 mb-1 footer-text ">
                  Tablets
                </Link>
                <Link className="text-white  py-1 mb-1 footer-text ">
                  Watches
                </Link>
              </div>
            </div>

            <div>
              <h5 className="text-white mb-2">Our App</h5>
              <div className="footer-links d-flex flex-column items-center justify-content-between">
                <span className="text-white  mb-1 footer-text">
                  Download our app and get extra 15%
                  <br />
                  discount on your first order.
                </span>
                <Link to={""} className="text-white py-2 mb-1">
                  <img
                    src={googlePlayStoreBadge}
                    className="img-fluid rounded-pill"
                    width={100}
                    height={30}
                    alt="Google Playstore Badge"
                    loading="lazy"
                  />
                </Link>
                <Link to={""} className="text-white py-2 mb-1 ">
                  <img
                    src={appStoreBadge}
                    width={100}
                    height={30}
                    className="img-fluid rounded-pill"
                    alt="App Store adge"
                    loading="lazy"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <footer className="p-2 container-fluid overflow-hidden">
        <div className="row">
          <div className="col-12">
            <p className="text-center mb-0 text-white">
              <span className="fs-6"> &copy;{new Date().getFullYear()}: </span>
              <Link to="/zeenet" className="text-white footer-text">
                Zeenet Tech Group.
              </Link>
            </p>
          </div>

          <div className=" col-12 d-flex flex-column align-items-center justify-content-between flex-wrap ">
            <div>
              <span className="text-white footer-text">Payment Methods.</span>
            </div>
            <div className="d-flex justify-content-between gap-10">
              <span className="text-white">
                <img
                  src={kcbBadge}
                  alt=""
                  width={80}
                  height={40}
                  className=" img-fluid rounded-pill"
                  loading="lazy"
                />
              </span>

              <span className="text-white">
                <img
                  src={mpesaBadge}
                  alt="Mpesa Badge"
                  className="img-fluid rounded-pill"
                  width={80}
                  height={40}
                  loading="lazy"
                />
              </span>

              <span className="text-white">
                <img
                  src={airtelMoneyBadge}
                  alt="Airtel Money Badge"
                  width={80}
                  height={40}
                  className="img-fluid rounded-pill"
                  loading="lazy"
                />
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
