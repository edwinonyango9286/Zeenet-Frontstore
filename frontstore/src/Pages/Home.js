import React, { useEffect, useRef } from "react";
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
import { FaGreaterThan } from "react-icons/fa";
import { FaLessThan } from "react-icons/fa";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blogs = useSelector((state) => state?.blog?.blogs);
  const products = useSelector((state) => state?.product?.products);
  const loadingProducts = useSelector(
    (state) => state?.product?.isLoading?.getAllProducts
  );
  const loadingBlogs = useSelector(
    (state) => state?.blog?.isLoading?.getAllBlogs
  );

  const featuredProducts =
    products?.filter((item) => item?.tags === "Featured") || [];
  const popularProducts =
    products?.filter((item) => item?.tags === "Popular") || [];
  const specialProducts =
    products?.filter((item) => item?.tags === "Special") || [];

  const addProductUserToWishlist = (productId) => {
    dispatch(addProductToWishlist(productId));
  };
  useEffect(() => {
    dispatch(getAllBlogs());
    dispatch(getAllProducts());
  }, [dispatch]);

  const formatKES = (amount) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const scrollContainerRef = useRef(null);
  const specialScrollContainerRef = useRef(null);
  const popularProductsConatainerRef = useRef(null);

  const scrollAmount = 200;

  const scrollLeft = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
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
                      <h4 className="text-uppercase fs-md-4 fw-bold">
                        Supercharged for pros.
                      </h4>
                      <h5 className="fs-2 fw-bold">iPad S13+ Pro.</h5>
                      <p className="d-none d-lg-block fw-bold">
                        From Ksh 56,000 to Ksh 98,000 <br />
                        or ksh 4000/mo. for 24 months.
                      </p>
                      <Link className="button" to={"/store"}>
                        BUY NOW
                      </Link>
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
                        <h4 className="text-uppercase fw-bold">best sales</h4>
                        <h5 className="text-capitalize fw-bold d-sm-none d-md-block">
                          laptop max
                        </h5>
                        <div className="d-none d-lg-block ">
                          <p className="fw-bold">
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
                        <h4 className="text-uppercase fw-bold">15% off</h4>
                        <h5 className="text-capitalize fw-bold d-sm-none d-md-block">
                          Smartwatch 7
                        </h5>
                        <p className="d-none d-lg-block fw-bold">
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
                        <h4 className="text-uppercase fw-bold">new arrivals</h4>
                        <h5 className="text-capitalize fw-bold d-sm-none d-md-block">
                          Buy IPad Air
                        </h5>
                        <p className="d-none d-lg-block fw-bold">
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
                        <h4 className="text-uppercase fw-bold">
                          Free Engraving
                        </h4>
                        <h5 className="text-capitalize fw-bold d-sm-none d-md-block">
                          AirPods Max
                        </h5>
                        <p className="d-none d-lg-block fw-bold">
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
                  <div className="d-flex align-items-center justify-content-between gap-4 overflow-scroll scroll-container">
                    {Array.isArray(services) &&
                      services?.map((service, index) => (
                        <div className="" key={index}>
                          <div className="d-flex gap-2 flex-nowrap">
                            <div className="">
                              <img
                                src={service?.image}
                                alt="Services"
                                width={40}
                                height={40}
                                loading="lazy"
                              />
                            </div>
                            <div>
                              <h6 className="fw-bold fs-6 m-0 p-0 text-nowrap">
                                {service?.title}
                              </h6>
                              <p
                                className="m-0 p-0 text-nowrap"
                                style={{ fontSize: "12px" }}
                              >
                                {service?.tagline}
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
                    {featuredProducts.length > 0 && (
                      <div className="d-flex flex-row align-items-center justify-content-between">
                        <div>
                          <h3 className="fw-bold fs-4 my-2">
                            Featured Collection
                          </h3>
                        </div>

                        <div className="d-flex flex-row gap-2 me-2 text-muted">
                          <FaLessThan
                            className="cusor-pointer"
                            onClick={() => scrollLeft(scrollContainerRef)}
                          />
                          <FaGreaterThan
                            className="cusor-pointer"
                            onClick={() => scrollRight(scrollContainerRef)}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div
                    className="col-12 d-inline-flex  flex-row  align-items-center justify-content-start gap-2 overflow-scroll scroll-container"
                    ref={scrollContainerRef}
                  >
                    {Array.isArray(featuredProducts) &&
                      featuredProducts?.map((item, index) => {
                        return (
                          <div key={index}>
                            <div className="product-card position-relative shadow my-2">
                              <div className="wishlist-icon position-absolute">
                                <button
                                  className="border-0 bg-transparent"
                                  onClick={(e) =>
                                    addProductUserToWishlist(item?._id)
                                  }
                                >
                                  <img
                                    src={wishlistIcon}
                                    alt="Wishlist"
                                    width={18}
                                    height={18}
                                  />
                                </button>
                              </div>
                              <div className="product-image">
                                <img
                                  src={item?.images[0]?.url}
                                  className="img-fluid mx-auto  rounded object-fit p-1 "
                                  alt={item?.title}
                                  width={100}
                                  height={140}
                                  onClick={() =>
                                    navigate("/product/" + item?._id)
                                  }
                                />
                                <img
                                  src={item?.images[0]?.url}
                                  className="img-fluid mx-auto rounded object-fit "
                                  alt="ProductImage"
                                  width={100}
                                  height={140}
                                  onClick={() =>
                                    navigate("/product/" + item?._id)
                                  }
                                />
                              </div>

                              <div className="product-details">
                                <h6 className="brand mt-3 mb-0">
                                  {item?.brand?.title}
                                </h6>
                                <h5 className="product-title mb-0 fw-bold">
                                  {item?.title}
                                </h5>

                                <div className="d-flex m-0 p-0">
                                  <ReactStars
                                    count={5}
                                    size={18}
                                    value={parseInt(item?.totalRating) ?? 0}
                                    edit={false}
                                    activeColor="#ffd700"
                                    classNames={"p-0 m-0"}
                                  />
                                  <p>({item?.totalRating})</p>
                                </div>
                                <p className="price fw-bold m-0">
                                  {formatKES(item?.price)}
                                </p>
                              </div>

                              <div className="action-bar position-absolute">
                                <div className="d-flex flex-column gap-1">
                                  <button className="border-0 bg-transparent">
                                    <img
                                      src={prodcompare}
                                      alt="Compare Product"
                                      loading="lazy"
                                      width={18}
                                      height={18}
                                    />
                                  </button>

                                  <button className="border-0 bg-transparent">
                                    <img
                                      src={view}
                                      alt="View Product"
                                      onClick={() =>
                                        navigate("/product/" + item?._id)
                                      }
                                      loading="lazy"
                                      width={18}
                                      height={18}
                                    />
                                  </button>
                                  <button className="border-0 bg-transparent">
                                    <img
                                      src={addCart}
                                      alt="cartImage"
                                      loading="lazy"
                                      width={18}
                                      height={18}
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
            </Container>

            <Container class1="famous-wrapper py-2  home-wrapper-2">
              <div className="row">
                <div className="col-12 d-flex  flex-row align-items-center justify-content-start gap-2 overflow-scroll scroll-container">
                  <div className="famous-card position-relative my-2">
                    <img src={famous1} alt="famous1" className="shadow" />
                    <div className="famous-content position-absolute">
                      <h5 className="text-white text-sm ">BIG SCREEN</h5>
                      <h6 className="text-white text-sm fw-bold">
                        Smart Watch Series 7
                      </h6>
                      <p className="text-white text-sm">
                        From ksh 4,000 or ksh 1,000/mo. for 4 mo.*
                      </p>
                    </div>
                  </div>

                  <div className="famous-card position-relative">
                    <img src={famous2} alt="famous2" className="shadow" />
                    <div className="famous-content position-absolute">
                      <h5 className="text-muted text-sm">STUDIO DISPLAY</h5>
                      <h6 className="text-dark text-sm fw-bold ">
                        600 units of brightness.
                      </h6>
                      <p className="text-dark text-sm">
                        27-inch 5k Retina display
                      </p>
                    </div>
                  </div>
                  <div className="famous-card position-relative">
                    <img src={famous3} alt="famous1" className="shadow" />
                    <div className="famous-content position-absolute">
                      <h5 className="text-muted text-sm">SMARTPHONES</h5>
                      <h6 className="text-dark text-sm fw-bold">
                        SMARTPHONE 13 PRO.
                      </h6>
                      <p className="text-dark text-sm">
                        Now Green. From ksh 6000 or <br /> ksh 2000/mo. for 24
                        mo. Footnote*
                      </p>
                    </div>
                  </div>

                  <div className="famous-card position-relative">
                    <img src={famous4} alt="famous1" className="shadow" />
                    <div className="famous-content position-absolute">
                      <h5 className="text-muted text-sm">Home Speaker</h5>
                      <h6 className="text-dark text-sm fw-bold">
                        Room-filling sound.
                      </h6>
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
                    {specialProducts.length > 0 && (
                      <div className="d-flex flex-row align-items-center justify-content-between">
                        <div>
                          <h3 className="fw-bold fs-4 mt-2 mb-3">
                            {specialProducts?.length === 0
                              ? " "
                              : " Special Products"}
                          </h3>
                        </div>
                        <div className="d-flex flex-row gap-2 me-2 text-muted">
                          <FaLessThan
                            className="cusor-pointer"
                            onClick={() =>
                              scrollLeft(specialScrollContainerRef)
                            }
                          />
                          <FaGreaterThan
                            className="cusor-pointer"
                            onClick={() =>
                              scrollRight(specialScrollContainerRef)
                            }
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div
                    className="col-12 d-flex flex-row align-items-center justify-content-start gap-3 flex-nowrap overflow-scroll scroll-container"
                    ref={specialScrollContainerRef}
                  >
                    {Array.isArray(specialProducts) &&
                      specialProducts?.map((item, index) => {
                        return (
                          <SpecialProducts
                            key={index}
                            id={item?._id}
                            brand={item?.brand?.title}
                            title={item?.title}
                            totalRating={parseInt(item?.totalRating ?? 0)}
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

            <Container class1="popular-wrapper home-wrapper-2">
              <div className="row">
                <div>
                  <div className="col-12">
                    <div className="d-flex flex-row align-items-center justify-content-between">
                      <div>
                        <h3 className="fw-bold fs-4 my-2">
                          {popularProducts.length === 0
                            ? ""
                            : "Popular Products"}
                        </h3>
                      </div>

                      <div className="d-flex flex-row gap-2 me-2 text-muted">
                        <FaLessThan
                          className="cusor-pointer"
                          onClick={() =>
                            scrollLeft(popularProductsConatainerRef)
                          }
                        />
                        <FaGreaterThan
                          className="cusor-pointer"
                          onClick={() =>
                            scrollRight(popularProductsConatainerRef)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-12 d-inline-flex flex-row align-items-center flex-nowrap justify-content-start gap-2 overflow-scroll scroll-container"
                    ref={popularProductsConatainerRef}
                  >
                    {Array.isArray(popularProducts) &&
                      popularProducts.map((item, index) => {
                        return (
                          <div key={index}>
                            <div className="product-card position-relative shadow my-2">
                              <div className="wishlist-icon position-absolute">
                                <button
                                  className="border-0 bg-transparent"
                                  onClick={(e) =>
                                    addProductUserToWishlist(item?._id)
                                  }
                                >
                                  <img
                                    src={wishlistIcon}
                                    alt="Wishlist"
                                    width={18}
                                    height={18}
                                  />
                                </button>
                              </div>
                              <div className="product-image">
                                <img
                                  src={item?.images[0]?.url}
                                  className="img-fluid object-fit "
                                  alt="Product"
                                  width={90}
                                  height={130}
                                  onClick={() =>
                                    navigate("/product/" + item?._id)
                                  }
                                />
                                <img
                                  src={item?.images[0]?.url}
                                  className="img-fluid mx-auto object-fit"
                                  alt="Product"
                                  width={90}
                                  height={130}
                                  onClick={() =>
                                    navigate("/product/" + item?._id)
                                  }
                                />
                              </div>

                              <div className="product-details">
                                <h6 className="brandvmb-0 mt-3">
                                  {item?.brand?.title}
                                </h6>
                                <h5 className="product-title mb-0 fw-bold">
                                  {item?.title}
                                </h5>
                                <ReactStars
                                  count={5}
                                  size={18}
                                  value={parseInt(item?.totalRating) ?? 0}
                                  edit={false}
                                  activeColor="#ffd700"
                                />
                                <p className="price fw-bold">
                                  {formatKES(item?.price)}
                                </p>
                              </div>

                              <div className="action-bar position-absolute">
                                <div className="d-flex flex-column gap-1">
                                  <button className="border-0 bg-transparent">
                                    <img
                                      src={prodcompare}
                                      alt="Compare Product"
                                      width={18}
                                      height={18}
                                    />
                                  </button>

                                  <button className="border-0 bg-transparent">
                                    <img
                                      src={view}
                                      alt="View Product"
                                      onClick={() =>
                                        navigate("/product/" + item?._id)
                                      }
                                      width={18}
                                      height={18}
                                    />
                                  </button>
                                  <button className="border-0 bg-transparent">
                                    <img
                                      src={addCart}
                                      alt="Add to cart"
                                      width={18}
                                      height={18}
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
            </Container>

            <Container class1="marquee-wrapper py-2 home-wrapper-2">
              <div className="row">
                <div className="col-12">
                  <div className="marquee-inner-wrapper card-wrapper bg-white rounded-3 shadow my-2">
                    <Marquee>
                      <div className="d-inline-flex align-items-center justify-content-between gap-4">
                        <div className="">
                          <img
                            src={brand1}
                            className="img-fluid "
                            width={40}
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
                            src={brand6}
                            className="img-fluid"
                            width={80}
                            height={40}
                            alt="brand6"
                          />
                        </div>
                        <div className="">
                          <img
                            src={brand7}
                            className="img-fluid"
                            width={80}
                            height={40}
                            alt="brand7"
                          />
                        </div>
                        <div className="">
                          <img
                            src={brand8}
                            className="img-fluid"
                            width={80}
                            height={40}
                            alt="brand8"
                          />
                        </div>
                      </div>
                    </Marquee>
                  </div>
                </div>
              </div>
            </Container>

            <Container class1="home-wrapper-2">
              <div className="row">
                <div className="col-12">
                  <div>
                    <h3 className="section-heading fw-bold fs-4 my-4">
                      {blogs && blogs?.length === 0 ? " " : "Our Latest News"}
                    </h3>
                  </div>
                  <div className="d-flex align-items-center justify-content-start gap-2 my-2 overflow-scroll scroll-container">
                    <BlogCard data={blogs} />
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
