import React, { useEffect } from "react";
import mainBanner from "../images/main-banner-1.jpg";
import { Link, useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import catBanner1 from "../images/catbanner-01.jpg";
import catBanner2 from "../images/catbanner-02.jpg";
import catBanner3 from "../images/catbanner-03.jpg";
import catBanner4 from "../images/catbanner-04.jpg";
import brand1 from "../images/brand-01.png";
import brand2 from "../images/brand-02.png";
import brand3 from "../images/brand-03.png";
import brand4 from "../images/brand-04.png";
import brand5 from "../images/brand-05.png";
import brand6 from "../images/brand-06.png";
import brand7 from "../images/brand-07.png";
import brand8 from "../images/brand-08.png";
import BlogCard from "../Components/BlogCard";
import SpecialProducts from "../Components/SpecialProducts";
import famous1 from "../images/famous-01.png";
import famous2 from "../images/famous-02.webp";
import famous3 from "../images/famous-03.webp";
import famous4 from "../images/famous-04.webp";
import Container from "../Components/Container";
import services from "../utils/Data";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blogs/blogSlice";
import { Spin } from "antd";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import {
  addProductToWishlist,
  getAllProducts,
} from "../features/products/productSlice";
import ReactStars from "react-rating-stars-component";
import wishlistIcon from "../images/wish.svg";
import prodcompare from "../images/prodcompare.svg";
import view from "../images/view.svg";
import addCart from "../images/add-cart.svg";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blogState = useSelector((state) => state?.blog?.blogs);
  const productState = useSelector((state) => state?.product?.products);
  const loadingProducts = useSelector((state) => state?.product?.isLoading);
  const loadingBlogs = useSelector((state) => state?.blog?.isLoading);

  const popularProducts =
    productState?.filter((item) => item?.tags === "Popular") || [];
  const specialProducts =
    productState?.filter((item) => item?.tags === "Special") || [];

  const addProductUserToWishlist = (productId) => {
    dispatch(addProductToWishlist(productId));
  };
  useEffect(() => {
    dispatch(getAllBlogs());
    dispatch(getAllProducts());
  }, []);

  const formatKES = (amount) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      <div>
        {loadingProducts && loadingBlogs ? (
          <div
            className="d-flex flex-row justify-content-center align-items-center"
            style={{ marginTop: "80px", marginBottom: "80px" }}
          >
            <Spin
              indicator={
                <Loading3QuartersOutlined
                  style={{
                    fontSize: 40,
                    fontWeight: "bold",
                    color: "#000",
                  }}
                  spin
                />
              }
            />
          </div>
        ) : (
          <div>
            <Container class1="py-2 py-sm-4">
              <div className="row">
                <div className="col-12 col-sm-6">
                  <div className="main-banner position-relative py-2">
                    <img
                      src={mainBanner}
                      className="img-fluid rounded-2"
                      alt="Main Banner"
                      loading="lazy"
                    />
                    <div className="main-banner-content position-absolute">
                      <h4 className="text-uppercase fs-md-4">
                        Supercharged for pros.
                      </h4>
                      <h5 className="fs-4 fs-md-3">iPad S13+ Pro.</h5>
                      <p className="d-none d-lg-block ">
                        From ksh: 56,000 to 98,000 <br />
                        or ksh 4000/mo. for 24 months.
                      </p>
                      <Link className="button">BUY NOW</Link>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-6">
                  <div className="d-flex flex-wrap justify-content-between align-items-center py-2">
                    <div className="small-banner position-relative">
                      <img
                        src={catBanner1}
                        className="img-fluid rounded-2"
                        alt="Small Banner"
                        loading="lazy"
                      />
                      <div className="small-banner-content position-absolute">
                        <h4 className="text-uppercase">best sales</h4>
                        <h5 className="text-capitalize">laptop max</h5>
                        <div className=" d-none d-lg-block ">
                          <p>
                            From Ksh 120,000 or <br /> ksh 6,000/mo.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="small-banner position-relative">
                      <img
                        src={catBanner2}
                        className="img-fluid rounded-2"
                        alt="Small Banner"
                        loading="lazy"
                      />
                      <div className="small-banner-content position-absolute">
                        <h4 className="text-uppercase">15% off</h4>
                        <h5 className="text-capitalize">Smartwatch 7</h5>
                        <p className="d-none d-lg-block">
                          Shop the latest brands <br /> styles and colors.
                        </p>
                      </div>
                    </div>

                    <div className="small-banner position-relative pt-2 ">
                      <img
                        src={catBanner3}
                        className="img-fluid rounded-2"
                        alt="Small Banner"
                        loading="lazy"
                      />
                      <div className="small-banner-content position-absolute">
                        <h4 className="text-uppercase">new arrivals</h4>
                        <h5 className="text-capitalize">Buy IPad Air</h5>
                        <p className="d-none d-lg-block">
                          From ksh 56,000 or <br /> ksh 4,000/mo for 12 mo.
                        </p>
                      </div>
                    </div>
                    <div className="small-banner position-relative pt-2 ">
                      <img
                        src={catBanner4}
                        className="img-fluid rounded-2"
                        alt="Small Banner"
                        loading="lazy"
                      />
                      <div className="small-banner-content position-absolute">
                        <h4 className="text-uppercase">Free Engraving</h4>
                        <h5 className="text-capitalize">AirPods Max</h5>
                        <p className="d-none d-lg-block">
                          High-fidelity playback & <br />
                          ultra-low distortion
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>

            <Container class1="home-wrapper-2 p-2">
              <div className="row">
                <div className="col-12">
                  <div className="services d-flex align-items-center justify-content-between">
                    {services?.map((service, index) => (
                      <div
                        className="d-flex align-items-center justify-content-center gap-20"
                        key={index}
                      >
                        <div>
                          <img
                            src={service.image}
                            alt="Services"
                            className="advertImages img-fluid"
                            width={40}
                            height={40}
                            loading="lazy"
                          />
                          <div>
                            <h6 className="d-none d-lg-block">
                              {service.title}
                            </h6>
                            <p className="mb-0 d-none d-sm-block">
                              {service.tagline}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Container>

            <Container class1="featured-wrapper py-2 home-wrapper-2">
              <div className="row">
                <div>
                  <div className="col-12">
                    <h3 className="section-heading">
                      {productState.length === 0 ? " " : "Featured collection"}
                    </h3>
                  </div>
                  <div className="col-12 d-inline-flex  flex-row  align-items-center justify-content-center justify-content-md-start  gap-md-2 flex-wrap">
                    {productState &&
                      productState.map((item, index) => {
                        if (item.tags === "Featured") {
                          return (
                            <div key={index} className="">
                              <div className="product-card position-relative">
                                <div className="wishlist-icon position-absolute">
                                  <button
                                    className="border-0 bg-transparent"
                                    onClick={(e) =>
                                      addProductUserToWishlist(item?._id)
                                    }
                                  >
                                    <img
                                      src={wishlistIcon}
                                      alt="Wishlist Image"
                                    />
                                  </button>
                                </div>
                                <div className="product-image">
                                  <img
                                    src={item?.images[0]?.url}
                                    className="img-fluid mx-auto border rounded object-fit "
                                    alt={item?.title}
                                    width={126}
                                    height={156}
                                    onClick={() =>
                                      navigate("/product/" + item?._id)
                                    }
                                  />
                                  <img
                                    src={item?.images[0]?.url}
                                    className="img-fluid mx-auto border rounded object-fit "
                                    alt="ProductImage"
                                    width={126}
                                    height={156}
                                    onClick={() =>
                                      navigate("/product/" + item?._id)
                                    }
                                  />
                                </div>

                                <div className="product-details">
                                  <h6 className="brand mt-3 mb-0">
                                    {item?.brand}
                                  </h6>
                                  <h5 className="product-title mb-0">
                                    {item?.title}
                                  </h5>
                                  <ReactStars
                                    count={5}
                                    size={18}
                                    value={parseInt(item?.totalrating) ?? 0}
                                    edit={false}
                                    activeColor="#ffd700"
                                  />
                                  <p className="price">
                                    {formatKES(item?.price)}
                                  </p>
                                </div>

                                <div className="action-bar position-absolute">
                                  <div className="d-flex flex-column gap-10">
                                    <button className="border-0 bg-transparent">
                                      <img
                                        src={prodcompare}
                                        alt="Compare Product Image"
                                        loading="lazy"
                                      />
                                    </button>

                                    <button className="border-0 bg-transparent">
                                      <img
                                        src={view}
                                        alt="View Product Image"
                                        onClick={() =>
                                          navigate("/product/" + item?._id)
                                        }
                                        loading="lazy"
                                      />
                                    </button>
                                    <button className="border-0 bg-transparent">
                                      <img
                                        src={addCart}
                                        alt="cartImage"
                                        loading="lazy"
                                      />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      })}
                  </div>
                </div>
              </div>
            </Container>

            <Container class1="famous-wrapper py-2  home-wrapper-2">
              <div className="row">
                <div className="col-12 d-inline-flex align-items-center justify-content-center justify-content-md-between justify-content-lg-start gap-10 flex-wrap flex-lg-nowrap">
                  <div className="famous-card position-relative">
                    <img
                      src={famous1}
                      className="img-fluid"
                      alt="famous1"
                      width={340}
                      height={300}
                    />
                    <div className="famous-content position-absolute">
                      <h5 className="text-white text-sm">BIG SCREEN</h5>
                      <h6 className="text-white text-sm">
                        Smart Watch Series 7
                      </h6>
                      <p className="text-white text-sm">
                        From ksh 4,000 or ksh 1,000/mo. for 4 mo.*
                      </p>
                    </div>
                  </div>

                  <div className="famous-card position-relative">
                    <img
                      src={famous2}
                      className="img-fluid"
                      alt="famous2"
                      width={340}
                      height={300}
                    />
                    <div className="famous-content position-absolute">
                      <h5 className="text-dark text-sm">STUDIO DISPLAY</h5>
                      <h6 className="text-dark text-sm ">
                        600 units of brightness.
                      </h6>
                      <p className="text-dark text-sm">
                        27-inch 5k Retina display
                      </p>
                    </div>
                  </div>
                  <div className="famous-card position-relative">
                    <img
                      src={famous3}
                      className="img-fluid"
                      alt="famous1"
                      width={340}
                      height={300}
                    />
                    <div className="famous-content position-absolute">
                      <h5 className="text-dark text-sm">SMARTPHONES</h5>
                      <h6 className="text-dark text-sm">SMARTPHONE 13 PRO.</h6>
                      <p className="text-dark text-sm">
                        Now Green. From ksh 6000 or <br /> ksh 2000/mo. for 24
                        mo. Footnote*
                      </p>
                    </div>
                  </div>

                  <div className="famous-card position-relative">
                    <img
                      src={famous4}
                      className="img-fluid"
                      alt="famous1"
                      width={340}
                      height={300}
                    />
                    <div className="famous-content position-absolute">
                      <h5 className="text-dark text-sm">Home Speaker</h5>
                      <h6 className="text-dark text-sm">Room-filling sound.</h6>
                      <p className="text-dark text-sm">
                        From ksh 2000 or ksh 1000/mo. for 12 mo*
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Container>

            <Container class1="home-wrapper-2 py-2">
              <div className="row">
                <div>
                  <div className="col-12">
                    <h3 className="section-heading">
                      {specialProducts.length === 0 ? " " : " Special products"}
                    </h3>
                  </div>

                  <div className="col-12 d-flex align-items-center justify-content-center justify-content-lg-start gap-10 flex-wrap">
                    {specialProducts > 0 &&
                      specialProducts.map((item, index) => {
                        return (
                          <SpecialProducts
                            key={index}
                            id={item?._id}
                            brand={item?.brand}
                            title={item?.title}
                            totalrating={item?.totalrating.toString()}
                            price={formatKES(item?.price)}
                            sold={item?.sold}
                            quantity={item?.quantity}
                            image={item?.images[0].url}
                          />
                        );
                      })}
                  </div>
                </div>
              </div>
            </Container>

            <Container class1="popular-wrapper home-wrapper-2 overflow-hidden">
              <div className="row">
                <div>
                  <div className="col-12">
                    <h3 className="section-heading">
                      {popularProducts.length === 0 ? "" : "Popular Products"}
                    </h3>
                  </div>

                  <div className="col-12">
                    <div className="d-flex align-items-center flex-wrap justify-content-center justify-content-md-start gap-25">
                      {popularProducts.length > 0 &&
                        popularProducts.map((item, index) => {
                          return (
                            <div key={index}>
                              <div className="product-card position-relative">
                                <div className="wishlist-icon position-absolute">
                                  <button
                                    className="border-0 bg-transparent"
                                    onClick={(e) =>
                                      addProductUserToWishlist(item?._id)
                                    }
                                  >
                                    <img
                                      src={wishlistIcon}
                                      alt="Wishlist Image"
                                    />
                                  </button>
                                </div>
                                <div className="product-image">
                                  <img
                                    src={item?.images[0]?.url}
                                    className="img-fluid mx-auto border rounded object-fit "
                                    alt="Product Image"
                                    width={126}
                                    height={156}
                                    onClick={() =>
                                      navigate("/product/" + item?._id)
                                    }
                                  />
                                  <img
                                    src={item?.images[0]?.url}
                                    className="img-fluid mx-auto border rounded object-fit"
                                    alt="Product Image"
                                    width={126}
                                    height={156}
                                    onClick={() =>
                                      navigate("/product/" + item?._id)
                                    }
                                  />
                                </div>

                                <div className="product-details">
                                  <h6 className="brandvmb-0 mt-3">
                                    {item?.brand}
                                  </h6>
                                  <h5 className="product-title mb-0">
                                    {item?.title}
                                  </h5>
                                  <ReactStars
                                    count={5}
                                    size={18}
                                    value={parseInt(item?.totalrating) ?? 0}
                                    edit={false}
                                    activeColor="#ffd700"
                                  />
                                  <p className="price">
                                    {formatKES(item?.price)}
                                  </p>
                                </div>

                                <div className="action-bar position-absolute">
                                  <div className="d-flex flex-column gap-15">
                                    <button className="border-0 bg-transparent">
                                      <img
                                        src={prodcompare}
                                        alt="Compare Product Image"
                                      />
                                    </button>

                                    <button className="border-0 bg-transparent">
                                      <img
                                        src={view}
                                        alt="View Product Image"
                                        onClick={() =>
                                          navigate("/product/" + item?._id)
                                        }
                                      />
                                    </button>
                                    <button className="border-0 bg-transparent">
                                      <img
                                        src={addCart}
                                        alt="Add to cart Image"
                                      />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </Container>

            <Container class1="marquee-wrapper py-2 home-wrapper-2">
              <div className="row">
                <div className="col-12">
                  <div className="marquee-inner-wrapper card-wrapper">
                    <Marquee>
                      <div className="d-flex align-items-center justify-content-between gap-50 ">
                        <div className="">
                          <img
                            src={brand1}
                            className="img-fluid "
                            width={80}
                            height={40}
                            alt="brand1"
                          />
                        </div>
                        <div className="">
                          <img
                            src={brand2}
                            className="img-fluid"
                            width={80}
                            height={40}
                            alt="brand2"
                          />
                        </div>
                        <div className="">
                          <img
                            src={brand3}
                            className="img-fluid"
                            width={80}
                            height={40}
                            alt="brand3"
                          ></img>
                        </div>
                        <div className="">
                          <img
                            src={brand4}
                            className="img-fluid"
                            width={80}
                            height={40}
                            alt="brand4"
                          ></img>
                        </div>
                        <div className="">
                          <img
                            src={brand5}
                            className="img-fluid"
                            width={80}
                            height={40}
                            alt="brand5"
                          ></img>
                        </div>
                        <div className="">
                          <img
                            src={brand6}
                            className="img-fluid"
                            width={80}
                            height={40}
                            alt="brand6"
                          ></img>
                        </div>
                        <div className="">
                          <img
                            src={brand7}
                            className="img-fluid"
                            width={80}
                            height={40}
                            alt="brand7"
                          ></img>
                        </div>
                        <div className="">
                          <img
                            src={brand8}
                            className="img-fluid"
                            width={80}
                            height={40}
                            alt="brand8"
                          ></img>
                        </div>
                      </div>
                    </Marquee>
                  </div>
                </div>
              </div>
            </Container>

            <Container class1="home-wrapper-2">
              <div className="row">
                <div>
                  <div className="col-12">
                    <h3 className="section-heading">
                      {blogState && blogState?.length === 0
                        ? " "
                        : "Our Latest News"}
                    </h3>
                  </div>

                  <div className="d-flex align-items-center gap-10 flex-wrap pb-2">
                    <BlogCard data={blogState} />
                  </div>
                </div>
              </div>
            </Container>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
