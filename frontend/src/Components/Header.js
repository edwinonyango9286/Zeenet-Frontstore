import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
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

const Header = () => {
  const { user, userCart, isError, isLoading, isSuccess, message } =
    useSelector((state) => state?.auth ?? {});

  const { products } = useSelector((state) => state?.product);
  const [productOpt, setProductOpt] = useState([]);
  const [paginate, setPaginate] = useState(true);
  const [cartData, setCartData] = useState(() => {
    const storedCart = localStorage.getItem("userCart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [quantity, setQuantity] = useState(0);
  useEffect(() => {
    let data = [];
    for (let index = 0; index < products.length; index++) {
      const element = products[index];
      data.push({ id: index, prod: element?._id, name: element?.title });
    }
    setProductOpt(data);
  }, [products]);

  useEffect(() => {
    let totalQuantity = 0;
    cartData.forEach((item) => {
      totalQuantity += +item.quantity;
    });
    setQuantity(totalQuantity);
  }, [cartData]);

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

                <div className="d-flex gap-10">
                  <div>
                    <p className="mb-0 header-info">
                      Hotline: {"  "}
                      <a className="text-white" href="tel:+254 719547267">
                        0719547267
                      </a>
                    </p>
                  </div>
                  <div>
                    <p className="header-info text-white mb-0 d-none d-md-block d-lg-block d-xxl-block">
                      English
                    </p>
                  </div>
                  <div>
                    <p className="header-info text-white mb-0 d-none d-md-block d-lg-block d-xxl-block ">
                      Kenya Shillings
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <header className="header-middle  py-2">
        <div className="container">
          <div className="row">
            <div className=" col-12 d-flex align-items-center ">
              <div className="col-6 col-md-2 d-flex align-items-center">
                <div className="menu-bottom header-bottom">
                  <div className="d-md-none d-lg-none d-xl-none d-xxl-none">
                    <div className="dropdown">
                      <TfiMenu
                        className="fs-1 dropdown-toggle"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{
                          cursor: "pointer",
                          border: "none",
                          outline: "none",
                          boxShadow: "none",
                          color: "white",
                          width: "48px",
                          height: "48px",
                          backgroundColor: "#131921",
                          padding: "10px",
                        }}
                      />

                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li>
                          <Link className="dropdown-item text-white" to="/">
                            HOME
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item text-white"
                            to="/store"
                          >
                            STORE
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item text-white"
                            to="/myorders"
                          >
                            ORDERS
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item text-white"
                            to="/blogs"
                          >
                            BLOGS
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item text-white"
                            to="/contact"
                          >
                            CONTACT
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item text-white"
                            to="/store"
                          >
                            LOGOUT
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item text-white"
                            to="/about"
                          >
                            About
                          </Link>
                        </li>
                      </ul>
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
                      style: {
                        boxShadow: "none",
                        outline: "none",
                      },
                    }}
                  />
                  <span className="input-group-text p-2" id="basic-addon2">
                    <BsSearch className="fs-6"></BsSearch>
                  </span>
                </div>
              </div>

              <div className="col-6 col-sm-5 ">
                <div className="header-middle-links d-flex align-items-center justify-content-center gap-15 ">
                  <div>
                    <Link
                      to="/compare-products"
                      className="d-flex align-items-center gap-10 text-white"
                    >
                      <img
                        src={compareImage}
                        alt="Compare Image"
                        className="img-fluid"
                        loading="lazy"
                        style={{
                          width: 35,
                          height: 35,
                        }}
                      />
                      <span className="mb-0 d-none d-lg-block" id="hidden">
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
                          width: 35,
                          height: 35,
                        }}
                      />
                      <span className="mb-0 d-none d-lg-block" id="hidden">
                        Favourite
                        <br /> Wishlist
                      </span>
                    </Link>
                  </div>

                  <div className="dropdown">
                    <Link
                      to={user === null ? "/login" : "/my-profile"}
                      className="d-flex align-items-center gap-10 text-white"
                    >
                      <img
                        src={accountImage}
                        alt="Account Image"
                        className="img-fluid"
                        loading="lazy"
                        style={{
                          width: 35,
                          height: 35,
                        }}
                      />
                      {user === null ? (
                        <span className="mb-0 d-none d-lg-block" id="hidden">
                          Log in
                          <br />
                          My Account
                        </span>
                      ) : (
                        <span
                          className="mb-0 d-none d-lg-block text-capitalize"
                          id="hidden"
                        >
                          Welcome
                          <br />
                          {user.firstname}
                        </span>
                      )}
                    </Link>
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
                            width: 35,
                            height: 35,
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
                              fontSize: "11px",
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
                              {quantity}
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
                      style: {
                        boxShadow: "none",
                        outline: "none",
                      },
                    }}
                  />
                  <span className="input-group-text p-2" id="basic-addon2">
                    <BsSearch className="fs-6"></BsSearch>
                  </span>
                </div>
              </div>
            </div>

            <div className="col-12 d-none d-sm-block">
              <div className="menu-bottom d-flex align-items-center gap-20">
                <div className="d-none d-sm-block">
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-20 d-flex align-items-center"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        src={menu}
                        alt="Menu Image"
                        className="img-fluid"
                        loading="lazy"
                      />
                      <span className="">SHOP CATEGORIES</span>
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
                          ASUS
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
