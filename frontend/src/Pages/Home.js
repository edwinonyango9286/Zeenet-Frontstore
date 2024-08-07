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
import {
  addToWishlist,
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
  const addProductToWishlist = (id) => {
    dispatch(addToWishlist(id));
  };
  useEffect(() => {
    blogs();
    products();
  }, []);
  const blogs = () => {
    dispatch(getAllBlogs());
  };
  const products = () => {
    dispatch(getAllProducts());
  };
  return (
    <>
      <Container class1="home-wrapper-2  pt-2 pt-sm-4">
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
                <h4>SUPPERCHARGED FOR PROS</h4>
                <h5>iPad S13+ Pro.</h5>
                <p>From Ksh: 56,000 to 98,000</p>
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
                  <h4>SUPPERCHARGED</h4>
                  <h5>MacBook Pro M3-</h5>
                  <p className="d-none d-lg-block">
                    From Ksh: 120,000 to 360,000
                  </p>
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
                  <h4>Best Sales</h4>
                  <h5>watchOS 10+</h5>
                  <p className="d-none d-lg-block">
                    From Ksh: 20,000 to 64,000
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
                  <h4>New Arrivals</h4>
                  <h5>Apple iPad</h5>
                  <p className="d-none d-lg-block">
                    From Ksh: 56,000 to 120,000
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
                  <h4>Bose QuietComfort </h4>
                  <h5>Sony WH-10</h5>
                  <p className="d-none d-lg-block">
                    From Ksh: 10,000 to 16,000
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="p-2">
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
                      <h6 className="d-none d-lg-block">{service.title}</h6>
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
          <div className="col-12">
            <h3 className="section-heading">Featured Collections</h3>
          </div>

          <div className="col-12 d-flex align-items-center justify-content-center justify-content-lg-start gap-10 flex-wrap ">
            {productState &&
              productState?.map((item, index) => {
                if (item?.tags === "featured") {
                  return (
                    <div key={index} className="">
                      <div className="product-card position-relative">
                        <div className="wishlist-icon position-absolute">
                          <button
                            className="border-0 bg-transparent"
                            onClick={(e) => addProductToWishlist(item?._id)}
                          >
                            <img src={wishlistIcon} alt="Wishlist Image" />
                          </button>
                        </div>
                        <div className="product-image">
                          <img
                            src={item?.images[0]?.url}
                            className="img-fluid mx-auto border rounded object-fit "
                            alt={item?.title}
                            width={180}
                            height={200}
                            onClick={() => navigate("/product/" + item?._id)}
                          />
                          <img
                            src={item?.images[0]?.url}
                            className="img-fluid mx-auto border rounded object-fit "
                            alt="ProductImage"
                            width={180}
                            height={200}
                            onClick={() => navigate("/product/" + item?._id)}
                          />
                        </div>

                        <div className="product-details">
                          <h6 className="brand">{item?.brand}</h6>
                          <h5 className="product-title">{item?.title}</h5>
                          <ReactStars
                            count={5}
                            size={20}
                            value={item?.totalrating.toString()}
                            edit={false}
                            activeColor="#ffd700"
                          />
                          <p className="price">
                            Ksh{" "}
                            {new Intl.NumberFormat("en-US", {
                              maximumFractionDigits: 0,
                            }).format(item?.price)}
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
                              <img src={addCart} alt="cartImage"  loading="lazy"/>
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
      </Container>

      <Container class1="famous-wrapper py-2 home-wrapper-2">
        <div className="row">
          <div className="col-12 d-flex flex-wrap align-items-center justify-content-center gap-10 ">
            <div className="famous-card position-relative">
              <img
                src={famous1}
                className="img-fluid"
                alt="famous1"
                width={270}
                height={240}
              />
              <div className="famous-content position-absolute">
                <h5 className="text-white text-sm">Dell Laptops</h5>
                <h6 className="text-white text-sm d-none d-md-block d-lg-block d-xl-block d-xxl-block ">
                  Dell Laptops
                </h6>
                <p className="text-white text-sm d-none d-md-block d-lg-block d-xl-block d-xxl-block">
                  From as low as Ksh 20,000/=
                </p>
              </div>
            </div>

            <div className="famous-card position-relative">
              <img
                src={famous2}
                className="img-fluid"
                alt="famous2"
                width={270}
                height={240}
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark text-sm">Lenovo Laptops</h5>
                <h6 className="text-dark text-sm d-none d-md-block d-lg-block d-xl-block d-xxl-block">
                  Lenovo Laptops
                </h6>
                <p className="text-dark text-sm d-none d-md-block d-lg-block d-xl-block d-xxl-block">
                  From as low as Ksh 15,000/=
                </p>
              </div>
            </div>
            <div className="famous-card position-relative">
              <img
                src={famous3}
                className="img-fluid"
                alt="famous1"
                width={270}
                height={240}
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark text-sm">Hp Laptops</h5>
                <h6 className="text-dark text-sm d-none d-md-block d-lg-block d-xl-block d-xxl-block">
                  Hp Laptops
                </h6>
                <p className="text-dark text-sm d-none d-md-block d-lg-block d-xl-block d-xxl-block">
                  From as low Ksh 15,000/-
                </p>
              </div>
            </div>

            <div className="famous-card position-relative">
              <img
                src={famous4}
                className="img-fluid"
                alt="famous1"
                width={270}
                height={240}
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark text-sm">Apple Laptops</h5>
                <h6 className="text-dark text-sm d-none d-sm-block">
                  Apple Laptops
                </h6>
                <p className="text-dark text-sm d-none d-sm-block">
                  From as low as Ksh 20,000/=
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="home-wrapper-2 py-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Special Products</h3>
          </div>

          <div className="col-12 d-flex align-items-center justify-content-center justify-content-lg-start gap-10 flex-wrap">
            {productState &&
              productState?.map((item, index) => {
                if (item.tags === "special") {
                  return (
                    <SpecialProducts
                      key={index}
                      id={item?._id}
                      brand={item?.brand}
                      title={item?.title}
                      totalrating={item?.totalrating.toString()}
                      price={new Intl.NumberFormat("en-US", {
                        maximumFractionDigits: 0,
                      }).format(item?.price)}
                      sold={item?.sold}
                      quantity={item?.quantity}
                      image={item?.images[0]?.url}
                    />
                  );
                }
              })}
          </div>
        </div>
      </Container>

      <Container class1="popular-wrapper home-wrapper-2 overflow-hidden">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Popular Products</h3>
          </div>

          <div className="col-12">
            <div className="d-flex align-items-center flex-wrap justify-content-center justify-content-lg-start gap-10 ">
              {productState &&
                productState?.map((item, index) => {
                  if (item?.tags === "popular") {
                    return (
                      <div key={index}>
                        <div className="product-card position-relative">
                          <div className="wishlist-icon position-absolute">
                            <button
                              className="border-0 bg-transparent"
                              onClick={(e) => addProductToWishlist(item?._id)}
                            >
                              <img src={wishlistIcon} alt="Wishlist Image" />
                            </button>
                          </div>
                          <div className="product-image">
                            <img
                              src={item?.images[0]?.url}
                              className="img-fluid mx-auto border rounded object-fit "
                              alt="Product Image"
                              width={180}
                              height={200}
                              onClick={() => navigate("/product/" + item?._id)}
                            />
                            <img
                              src={item?.images[0]?.url}
                              className="img-fluid mx-auto border rounded object-fit"
                              alt="Product Image"
                              width={180}
                              height={200}
                              onClick={() => navigate("/product/" + item?._id)}
                            />
                          </div>

                          <div className="product-details">
                            <h6 className="brand">{item?.brand}</h6>
                            <h5 className="product-title">{item?.title}</h5>
                            <ReactStars
                              count={5}
                              size={20}
                              value={item?.totalrating.toString() || 4}
                              edit={false}
                              activeColor="#ffd700"
                            />
                            <p className="price">
                              Ksh{" "}
                              {new Intl.NumberFormat("en-US", {
                                maximumFractionDigits: 0,
                              }).format(item?.price)}
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
                                <img src={addCart} alt="Add to cart Image" />
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

      <Container class1="marquee-wrapper py-2 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper card-wrapper">
              <Marquee>
                <div className="d-flex align-items-center justify-content-between gap-50">
                  <div className="">
                    <img
                      src={brand1}
                      className="img-fluid "
                      width={80}
                      height={40}
                      alt="brand1"
                    ></img>
                  </div>
                  <div className="">
                    <img
                      src={brand2}
                      className="img-fluid"
                      width={80}
                      height={40}
                      alt="brand2"
                    ></img>
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
          <div className="col-12">
            <h3 className="section-heading">Our Latest Blogs</h3>
          </div>

          <div className="d-flex align-items-center gap-10 flex-wrap pb-2">
            <BlogCard data={blogState ? blogState : []} />
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;