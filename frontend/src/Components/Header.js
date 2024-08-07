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
import { logoutUser } from "../features/users/userSlice";

const Header = () => {
  const authState = useSelector((state) => state?.auth);
  const productState = useSelector((state) => state?.product?.products);
  const [productOpt, setProductOpt] = useState([]);
  const [paginate, setPaginate] = useState(true);
  const [cartData, setCartData] = useState(() => {
    const storedCart = localStorage.getItem("userCart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    let data = [];
    for (let index = 0; index < productState.length; index++) {
      const element = productState[index];
      data.push({ id: index, prod: element?._id, name: element?.title });
    }
    setProductOpt(data);
  }, [productState]);

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
    localStorage.removeItem("customer");
    localStorage.removeItem("token");
    navigate("/store");
    window.location.reload();
  };

  return (
    <>
      <div className="header-top container-fluid px-4 py-2">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-center justify-content-sm-between align-items-center">
              <div className="d-none d-sm-block">
                <p className="text-white mb-0 header-info ">
                  Free delivery & returns for all our customers.
                </p>
              </div>

              <div className="d-flex gap-10">
                <div>
                  <p className="text-white mb-0 header-info">
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

      <div className="header-upper py-2 container-fluid">
        <div className="row">
          <div className="d-flex align-items-center">
            <div className="col-6 col-md-2 d-flex  ">
              <div>
                <div className="d-md-none d-lg-none d-xl-none d-xxl-none">
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 d-flex align-items-center shadow-none"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        src={menu}
                        alt="Menu Image"
                        className="img-fluid"
                        style={{
                          width: "24px",
                          height: "24px",
                        }}
                        loading="lazy"
                      />
                      <span className="d-none d-sm-block">SHOP CATEGORIES</span>
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
              </div>

              <div>
                <h2>
                  <Link to="/" className="text-white logo">
                    Zeenet
                  </Link>
                </h2>
              </div>
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
              <div className="header-upper-links d-flex align-items-center justify-content-center gap-10">
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
                    />
                    <p className="mb-0 d-none d-lg-block" id="hidden">
                      Compare
                      <br />
                      Products
                    </p>
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
                    />
                    <p className="mb-0 d-none d-lg-block" id="hidden">
                      Favourite
                      <br /> Wishlist
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to={authState?.user === null ? "/login" : "/my-profile"}
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img
                      src={accountImage}
                      alt="Account Image"
                      className="img-fluid"
                      loading="lazy"
                    />
                    {authState?.user === null ? (
                      <p className="mb-0 d-none d-lg-block" id="hidden">
                        Log in
                        <br />
                        My Account
                      </p>
                    ) : (
                      <p
                        className="mb-0 d-none d-lg-block text-capitalize"
                        id="hidden"
                      >
                        Welcome
                        <br />
                        {authState?.user?.firstname}
                      </p>
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
                      />
                      <div
                        className="d-flex flex-column position-absolute  badge-container"
                        style={{
                          top: "-4px",
                          left: "15px",
                        }}
                      >
                        <h6
                          style={{
                            fontSize: "11px",
                            fontWeight: "500",
                          }}
                          className="mb-0"
                        >
                          <span
                            className="badge bg-white rounded-pill text-dark mb-0"
                            style={{
                              fontSize: "9px",
                            }}
                          >
                            {quantity}
                          </span>
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

      <header className="header-bottom py-1 container-fluid header-upper">
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
            <div className="menu-bottom d-flex align-items-center gap-10">
              <div className="d-none d-sm-block">
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-10  d-flex align-items-center"
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
                <div className="d-flex align-items-center gap-10">
                  <NavLink to="/">home</NavLink>
                  <NavLink to="/store">store</NavLink>
                  <NavLink to="/myorders">orders</NavLink>
                  <NavLink to="/blogs">blogs</NavLink>
                  <NavLink to="/contact">contact</NavLink>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className=" border-0  bg-transparent text-white text-uppercase"
                    style={{ fontSize: "12px", fontWeight: "300" }}
                  >
                    Logout
                  </button>
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
