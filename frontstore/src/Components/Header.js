import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import compareImage from "../images/compare.svg";
import wishlistImage from "../images/wishlist.svg";
import accountImage from "../images/user.svg";
import cartImage from "../images/cart.svg";
import menu from "../images/menu.svg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { getAproduct } from "../features/products/productSlice";
import { TfiMenu } from "react-icons/tfi";
import { RiArrowDownSLine } from "react-icons/ri";
import { logoutUser, resetState } from "../features/users/userSlice";
import Cookies from "js-cookie";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userCart = useSelector((state) => state?.user?.userCart);
  const { products } = useSelector((state) => state?.product);
  const [productOpt, setProductOpt] = useState([]);
  const [paginate, setPaginate] = useState(true);

  useEffect(() => {
    let data = [];
    for (let index = 0; index < products.length; index++) {
      const element = products[index];
      data.push({ id: index, prod: element?._id, name: element?.title });
    }
    setProductOpt(data);
  }, [products]);

  const firstName = Cookies.get("firstName");
  const accessToken = Cookies.get("accessToken");

  const isSuccessLogoutUser = useSelector(
    (state) => state?.user?.isSuccess?.logoutUser
  );
  const message = useSelector((state) => state.user.message);

  useEffect(() => {
    if (isSuccessLogoutUser && message) {
      navigate("/signin");
      dispatch(resetState());
    }
  }, [isSuccessLogoutUser, message]);

  const handleLogout = async () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      <header className="header-top py-2 overflow-lg-hidden">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="d-flex flex-row justify-content-center justify-content-sm-between align-items-center">
                <div className="d-none d-sm-block">
                  <p className="my-1 header-info ">
                    Free delivery & returns for all our customers.
                  </p>
                </div>

                <div className="d-flex gap-20 justify-content-center align-items-center justify-content-lg-end">
                  <div>
                    <p className="mb-0 header-info">
                      Hotline: {"  "}
                      <a className="text-white" href="tel:+254 719547267">
                        (+254)719547267
                      </a>
                    </p>
                  </div>

                  <div>
                    <p className="header-info text-white mb-0 d-none d-md-block">
                      English
                    </p>
                  </div>
                  <div className="vertical-rule d-none d-md-block"></div>
                  <div>
                    <p className="header-info text-white mb-0 d-none d-md-block">
                      Kenya Shillings
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <header className="header-middle py-2">
        <div className="container">
          <div className="row">
            <div className="col-12 d-flex flex-row gap-md-4 align-items-center justify-content-between">
              <div className="d-sm-none col-6 col-md-2 d-flex flex-row align-items-center gap-3 my-1">
                <div className="header-bottom">
                  <div className="dropdown">
                    <TfiMenu
                      className="fs-4"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{
                        cursor: "pointer",
                        border: "none",
                        outline: "none",
                        boxShadow: "none",
                        color: "white",
                        backgroundColor: "#131921",
                        marginTop: "-8px",
                      }}
                    />
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <Link className="dropdown-item text-white" to="/">
                        Home
                      </Link>
                      <Link className="dropdown-item text-white" to="/store">
                        Store
                      </Link>
                      <Link className="dropdown-item text-white" to="/myorders">
                        Orders
                      </Link>
                      <Link className="dropdown-item text-white" to="/blogs">
                        Blogs
                      </Link>
                      <Link className="dropdown-item text-white" to="/contact">
                        Contact
                      </Link>
                      <Link className="dropdown-item text-white" to="/about">
                        About
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="d-sm-none">
                  <h2 className="m-0 p-0">
                    <Link
                      to="/"
                      className="text-white text-start fw-bold text-uppercase fs-2  fs-sm-1"
                    >
                      Zeenet
                    </Link>
                  </h2>
                </div>
              </div>

              <div className="d-none d-sm-block ">
                <h2 className="m-0 p-0">
                  <Link
                    to="/"
                    className="text-white  text-start fw-bold text-uppercase"
                  >
                    Zeenet
                  </Link>
                </h2>
              </div>

              <div className="d-none d-sm-block col-sm-5 mx-sm-2">
                <div className="input-group">
                  <Typeahead
                    id=""
                    onPaginate={() => console.log("result paginated")}
                    onChange={(selected) => {
                      navigate(`/product/${selected[0]?.prod}`);
                      dispatch(getAproduct(selected[0]?.prod));
                    }}
                    minLength={2}
                    options={productOpt}
                    paginate={paginate}
                    labelKey={"name"}
                    placeholder="Search product here...?"
                    inputProps={{
                      className: "custom-typeahead-input",
                      style: {
                        height: "32px",
                        boxShadow: "none",
                        outline: "none",
                      },
                    }}
                  />
                  <span className="input-group-text px-3" id="basic-addon2">
                    <IoSearchSharp />
                  </span>
                </div>
              </div>

              <div className="col-5 col-sm-4 col-md-5">
                <div className="header-middle-links d-flex align-items-center  justify-content-center justify-content-sm-end justify-content-md-center  gap-2 gap-sm-3 gap-md-4  gap-lg-2  justify-content-lg-end me-lg-4">
                  <div>
                    <Link
                      to="/compare-products"
                      className="d-flex align-items-center gap-2 text-white"
                    >
                      <img
                        src={compareImage}
                        alt="Compare"
                        className="img-fluid"
                        loading="lazy"
                        style={{
                          width: "28px",
                          height: "28px",
                        }}
                      />
                      <span className="mb-0 mt-0 d-none d-lg-block">
                        Compare
                        <br /> Products
                      </span>
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="/wishlist"
                      className="d-flex align-items-center gap-2 text-white"
                    >
                      <img
                        src={wishlistImage}
                        alt="Wishlist"
                        className="img-fluid"
                        loading="lazy"
                        style={{
                          width: "28px",
                          height: "28px",
                        }}
                      />
                      <span className="mb-0 mt-0 d-none d-lg-block">
                        Favourite
                        <br /> Wishlist
                      </span>
                    </Link>
                  </div>

                  <div className="dropdown">
                    <button
                      className="d-flex align-items-center gap-2 text-white btn bg-transparent p-0"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{
                        border: "none",
                        outline: "none",
                        boxShadow: "none",
                      }}
                    >
                      <img
                        src={accountImage}
                        alt="Account"
                        className="img-fluid"
                        loading="lazy"
                        style={{
                          width: "28px",
                          height: "28px",
                        }}
                      />

                      {accessToken === undefined ? (
                        <span className="mb-0 mt-0 d-none d-lg-block">
                          Log in
                          <br />
                          My Account
                        </span>
                      ) : (
                        <span className="mb-0 d-none d-lg-block text-capitalize">
                          Hi, {firstName}
                        </span>
                      )}
                    </button>

                    <div
                      className="dropdown-menu "
                      aria-labelledby="dropdownMenuButton"
                    >
                      {accessToken === undefined ? (
                        <Link className="dropdown-item" to={"/signin"}>
                          Sign In
                        </Link>
                      ) : (
                        <Link className="dropdown-item" to={"/profile"}>
                          Account
                        </Link>
                      )}

                      {accessToken === undefined ? (
                        <Link className="dropdown-item" to={"/signup"}>
                          Register
                        </Link>
                      ) : (
                        <Link className="dropdown-item" onClick={handleLogout}>
                          Log Out
                        </Link>
                      )}
                    </div>
                  </div>

                  <div className="d-flex flex-column justify-content-between align-items-center">
                    <div>
                      <Link
                        to="/cart"
                        className="d-flex align-items-center justify-content-between text-white mb-0 position-relative"
                      >
                        <img
                          src={cartImage}
                          alt="cart"
                          className="img-fluid "
                          loading="lazy"
                          style={{
                            width: "28px",
                            height: "28px",
                          }}
                        />

                        <div
                          className="d-flex flex-column position-absolute  badge-container"
                          style={{
                            top: "-6px",
                            left: "20px",
                          }}
                        >
                          <h6
                            style={{
                              fontSize: "10px",
                              fontWeight: "500",
                            }}
                            className="mb-0"
                          >
                            <p
                              className="badge bg-white rounded-pill text-dark mb-0"
                              style={{
                                fontSize: "10px",
                              }}
                            >
                              {userCart ? userCart?.length : 0}
                            </p>
                          </h6>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-1 header-middle">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="d-sm-none py-2">
                <div className="input-group">
                  <Typeahead
                    id=""
                    onPaginate={() => console.log("result paginated")}
                    onChange={(selected) => {
                      navigate(`/product/${selected[0]?.prod}`);
                      dispatch(getAproduct(selected[0]?.prod));
                    }}
                    minLength={2}
                    options={productOpt}
                    paginate={paginate}
                    labelKey={"name"}
                    placeholder="Search product here...?"
                    inputProps={{
                      className: "custom-typeahead-input",
                      style: {
                        height: "36px",
                        boxShadow: "none",
                        outline: "none",
                      },
                    }}
                  />
                  <span className="input-group-text px-3" id="basic-addon2">
                    <IoSearchSharp className="fs-6" />
                  </span>
                </div>
              </div>
            </div>

            <div className="col-12 d-none d-sm-block">
              <div className="d-flex align-items-center justify-content-start gap-2">
                <div className="d-none d-sm-block">
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary bg-transparent border-0 gap-20 d-flex align-items-center justify-content-start"
                      type="button"
                      id="dropdownMenuButton1"
                      aria-haspopup="true"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        src={menu}
                        alt="Menu"
                        className="img-fluid d-sm-none d-md-block"
                        loading="lazy"
                      />
                      <div className="d-flex gap-2 align-items-center">
                        <span>SHOP CATEGORIES</span>
                        <RiArrowDownSLine className="fs-6" />
                      </div>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <Link className="dropdown-item text-white" to="/">
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="/store">
                          Apple
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="/store">
                          Dell
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="/store">
                          HP (Hewlett-Packard)
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="/store">
                          Samsung
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="/store">
                          Asus
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="/store">
                          Lenovo
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="/store">
                          Toshiba
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="vertical-rule d-none d-md-block"></div>
                <div className="menu-links col-6">
                  <div className="d-flex align-items-center gap-3 gap-md-4">
                    <NavLink to="/">home</NavLink>
                    <NavLink to="/store">store</NavLink>
                    <NavLink to="/myorders">orders</NavLink>
                    <NavLink to="/blogs">blogs</NavLink>
                    <NavLink to="/contact">contact</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
