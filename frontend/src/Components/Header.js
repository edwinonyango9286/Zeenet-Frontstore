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

const Header = () => {
  const { user } = useSelector((state) => state?.user ?? {});
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("persist:root");
    navigate("/store");
    window.location.reload();
  };

  return (
    <>
      <header className="header-top py-2">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="d-flex justify-content-center justify-content-sm-between align-items-center">
                <div className="d-none d-sm-block">
                  <p className="mb-0 header-info ">
                    Free delivery & returns for all our customers.
                  </p>
                </div>

                <div className="d-flex gap-20 justify-content-center align-items-center">
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

      <header className="header-middle py-1">
        <div className="container">
          <div className="row">
            <div className=" col-12 d-flex align-items-center ">
              <div className="col-6 col-md-2 d-flex align-items-center">
                <div className="header-bottom">
                  <div className="d-md-none">
                    <div className="dropdown">
                      <TfiMenu
                        className="fs-2"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{
                          cursor: "pointer",
                          border: "none",
                          outline: "none",
                          boxShadow: "none",
                          color: "white",
                          width: "44px",
                          height: "44px",
                          backgroundColor: "#131921",
                          padding: "10px",
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
                        <Link
                          className="dropdown-item text-white"
                          to="/myorders"
                        >
                          Orders
                        </Link>
                        <Link className="dropdown-item text-white" to="/blogs">
                          Blogs
                        </Link>
                        <Link
                          className="dropdown-item text-white"
                          to="/contact"
                        >
                          Contact
                        </Link>

                        <Link className="dropdown-item text-white" to="/store">
                          Logout
                        </Link>
                        <Link className="dropdown-item text-white" to="/about">
                          About
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <h2>
                  <Link to="/" className="text-white logo mt-2 md:mt-0">
                    Zeenet
                  </Link>
                </h2>
              </div>

              <div className="d-none d-sm-block col-sm-5">
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

              <div className="col-6 col-sm-5 ">
                <div className="header-middle-links d-flex align-items-center justify-content-center  gap-2 gap-md-3 ">
                  <div>
                    <Link
                      to="/compare-products"
                      className="d-flex align-items-center gap-2 text-white"
                    >
                      <img
                        src={compareImage}
                        alt="Compare Image"
                        className="img-fluid"
                        loading="lazy"
                        style={{
                          width: 30,
                          height: 30,
                        }}
                      />
                      <span className="mb-0 d-none d-lg-block">
                        Compare
                        <br />
                        Products
                      </span>
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="/wishlist"
                      className="d-flex align-items-center gap-10 text-white"
                    >
                      <img
                        src={wishlistImage}
                        alt="Wishlist Image"
                        className="img-fluid"
                        loading="lazy"
                        style={{
                          width: 30,
                          height: 30,
                        }}
                      />
                      <span className="mb-0 d-none d-lg-block">
                        Favourite
                        <br /> Wishlist
                      </span>
                    </Link>
                  </div>

                  <div className="">
                    <div className="dropdown">
                      <button
                        className="d-flex align-items-center gap-10 text-white btn bg-transparent"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-expanded="false"
                        style={{
                          border: "none",
                          outline: "none",
                          boxShadow: "none",
                        }}
                      >
                        <img
                          src={accountImage}
                          alt="Account Image"
                          className="img-fluid"
                          loading="lazy"
                          style={{
                            width: 30,
                            height: 30,
                          }}
                        />

                        {user === null ? (
                          <span className="mb-0 d-none d-lg-block">
                            Log in
                            <br />
                            My Account
                          </span>
                        ) : (
                          <span className="mb-0 d-none d-lg-block text-capitalize">
                            Welcome
                            <br />
                            {user?.firstname}
                          </span>
                        )}
                      </button>

                      <div
                        className="dropdown-menu "
                        aria-labelledby="dropdownMenuButton"
                      >
                        <Link
                          className="dropdown-item"
                          to={user === null ? "/login" : ""}
                        >
                          Login
                        </Link>

                        <Link className="dropdown-item" to={"/signup"}>
                          Register
                        </Link>
                      </div>
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
                          alt="Cart Image"
                          className="img-fluid "
                          loading="lazy"
                          style={{
                            width: 30,
                            height: 30,
                          }}
                        />

                        <div
                          className="d-flex flex-column position-absolute  badge-container"
                          style={{
                            top: "-4px",
                            left: "24px",
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
              <div className="d-flex align-items-center gap-20">
                <div className="d-none d-sm-block">
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary bg-transparent border-0 gap-20 d-flex align-items-center"
                      type="button"
                      id="dropdownMenuButton1"
                      aria-haspopup="true"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        src={menu}
                        alt="Menu Image"
                        className="img-fluid"
                        loading="lazy"
                      />
                      <div className="d-flex gap-4 align-items-center ">
                        <span className="">SHOP CATEGORIES</span>
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
                  <div className="d-flex align-items-center gap-20">
                    <NavLink to="/">home</NavLink>
                    <NavLink to="/store">store</NavLink>
                    <NavLink to="/myorders">orders</NavLink>
                    <NavLink to="/blogs">blogs</NavLink>
                    <NavLink to="/contact">contact</NavLink>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className=" border-0  bg-transparent text-white text-uppercase"
                      style={{
                        fontSize: "14px",
                        fontWeight: "300",
                        lineHeight: "24px",
                        letterSpacing: "o.3px",
                        color: "white",
                      }}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
