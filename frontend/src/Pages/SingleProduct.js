import React, { useEffect, useState } from "react";
import Meta from "../Components/Meta";
import BreadCrumb from "../Components/BreadCrumb";
import ProductCard from "../Components/ProductCard";
import ReactStars from "react-rating-stars-component";
import ReactImageZoom from "react-image-zoom";
import { VscGitCompare } from "react-icons/vsc";
import { AiOutlineHeart } from "react-icons/ai";
import Container from "../Components/Container";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductRating,
  getAllProducts,
  getAproduct,
  resetState,
} from "../features/products/productSlice";
import { toast } from "react-toastify";
import mpesaBadge from "../images/Mpesa logo best.png";
import kcbBadge from "../images/kcb logo.png";
import airtelMoneyBadge from "../images/airtel-logo  best.jpg";

const SingleProduct = () => {
  const [quantity, setQuantity] = useState(1);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getProductId = location.pathname.split("/")[2];
  const productState = useSelector((state) => state?.product?.singleProduct);
  const productsState = useSelector((state) => state?.product?.products);
  const [popularProducts, setPopularProducts] = useState([]);
  const [star, setStar] = useState(null);
  const [comment, setComment] = useState(null);

  useEffect(() => {
    dispatch(resetState());
    dispatch(getAproduct(getProductId));
    dispatch(getAllProducts());
  }, []);

  const addToCart = () => {
    const cartData = {
      productId: productState?._id,
      quantity: quantity,
      price: productState?.price,
      title: productState?.title,
      images: productState?.images[0]?.url,
      screensize: productState?.screensize,
    };
    const existingCart = JSON.parse(localStorage.getItem("userCart")) || [];
    const index = existingCart.findIndex(
      (item) => item.productId === cartData.productId
    );
    if (index === -1) {
      existingCart.push({ ...cartData, quantity: 1 });
    } else {
      existingCart[index].quantity += 1;
      cartData.quantity = existingCart[index].quantity;
    }
    localStorage.setItem("userCart", JSON.stringify(existingCart));
    toast.success("Product added to cart.");
    return existingCart;
  };

  const props = {
    width: 600,
    height: 600,
    zoomWidth: 600,
    img: productState?.images[0]?.url
      ? productState?.images[0]?.url
      : "https://media.istockphoto.com/id/1139493113/vector/black-laptop-with-white-monitor-vector.jpg?s=612x612&w=0&k=20&c=-dMyJaIBvqhtLcemuC4O-D2x-HE7xZGqeDM6J67oGwo=",
  };

  const copyToClipboard = (text) => {
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  useEffect(() => {
    let data = [];
    for (let index = 0; index < productsState.length; index++) {
      const element = productsState[index];
      if (element.tags === "popular") {
        data.push(element);
      }
      setPopularProducts(data);
    }
  }, [productsState]);

  const addRatingToProduct = () => {
    if (star === null) {
      toast.error("Add star rating?");
      return false;
    } else if (comment === null) {
      toast.error("Please write a review about the product?");
      return false;
    } else {
      dispatch(
        addProductRating({ star: star, comment: comment, prodId: getProductId })
      );
      dispatch(getAproduct(getProductId));
      return false;
    }
  };

  const ratingValue = parseFloat(productState?.totalrating) || 0;

  const formatKES = (amount) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      <Meta title={productState?.title} />
      <BreadCrumb title={productState?.title} />
      <Container class1="main-product-wrapper py-2 home-wrapper-2 overflow-hidden">
        <div className="row">
          <div className="col-12 d-flex justify-content-between flex-wrap gap-10 flex-md-nowrap">
            <div className="col-12 col-md-6">
              <div className="main-product-image mb-2">
                <div>
                  <ReactImageZoom {...props} />
                </div>
              </div>
              <div className="other-product-images d-flex flex-wrap justify-content-between">
                <div>
                  <img
                    src={productState?.images[0]?.url}
                    className="img-fluid square-image object-fit rounded"
                    alt={productState?.title}
                  />
                </div>
                <div>
                  <img
                    src={productState?.images[0]?.url}
                    className="img-fluid square-image object-fit rounded"
                    alt={productState?.title}
                  />
                </div>
                <div>
                  <img
                    src={productState?.images[0]?.url}
                    className="img-fluid square-image object-fit rounded"
                    alt={productState?.title}
                  />
                </div>
                <div>
                  <img
                    src={productState?.images[0]?.url}
                    className="img-fluid square-image object-fit rounded"
                    alt={productState?.title}
                  />
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="main-product-details">
                <div className="border-bottom">
                  <h3 className="title">{productState?.title}</h3>
                </div>
                <div className="border-bottom py-2">
                  <p className="price">{formatKES(productState?.price)}</p>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={20}
                      value={parseFloat(productState?.totalrating)}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0 t-review">(2 Reviews )</p>
                  </div>
                  <a className="review-btn" href="#review">
                    Write a review
                  </a>
                </div>
                <div className=" py-3">
                  <div className="d-flex gap-10 align-items-center">
                    <h3 className="product-heading">Type:</h3>
                    <p className="product-data">{productState?.category}</p>
                  </div>

                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Brand:</h3>
                    <p className="product-data">{productState?.brand}</p>
                  </div>

                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Category:</h3>
                    <p className="product-data">{productState?.category}</p>
                  </div>

                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Tags:</h3>
                    <p className="product-data">{productState?.tags}</p>
                  </div>

                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Availability:</h3>
                    <p className="product-data">In Stock</p>
                  </div>

                  <div className="d-flex gap-10 flex-wrap mt-2 mb-4">
                    <h3 className="product-heading"> Screen Size:</h3>
                    <div className="d-flex flex-wrap gap-2 gap-md-15">
                      <span className="bg-white text-dark border px-2">
                        {productState?.screensize}"
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center  gap-15  flex-row mt-2 mb-4">
                    <div className="d-flex  align-items-center gap-30 ">
                      <div>
                        <button
                          className="button border-0"
                          type="button"
                          onClick={() => {
                            addToCart();
                          }}
                        >
                          Add To Cart
                        </button>
                      </div>
                      <div>
                        <button
                          className="button signup border-0"
                          type="button"
                          onClick={() => {
                            addToCart();
                            navigate("/cart");
                          }}
                        >
                          Buy It Now{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-15">
                    <div>
                      <a href="">
                        <VscGitCompare className="fs-5 me-2" />
                        Add To Compare
                      </a>
                    </div>
                    <div>
                      <a href="">
                        <AiOutlineHeart className="fs-5 me-2" />
                        Add To Wishlist
                      </a>
                    </div>
                  </div>
                  <div className="d-flex gap-10 flex-column my-3">
                    <h3 className="product-heading">Delivery & Returns:</h3>
                    <p className="product-data">
                      Free Delivery and Returns available for all orders.
                      <br />
                      We deliver all domestic orders within
                      <b> 1-2 business days.</b>
                    </p>
                  </div>
                  <div className="d-flex gap-10 align-items-center mt-2 mb-4">
                    <h3 className="product-heading"> Product Link :</h3>
                    <a
                      href="javasrcript:void(0);"
                      onClick={() => {
                        copyToClipboard(window.location.href);
                      }}
                    >
                      Copy Product Link
                    </a>
                  </div>

                  <div className="d-flex flex-column justify-content-center align-items-center my-2 ">
                    <div className="mb-4">
                      <h6
                        style={{
                          fontSize: "14px",
                          fontWeight: "500",
                          lineHeight: "22px",
                        }}
                      >
                        Payment Methods
                      </h6>
                    </div>
                    <div className="d-flex  justify-content-between gap-10">
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
                          alt=""
                          width={80}
                          height={40}
                          className="img-fluid rounded-pill"
                          loading="lazy"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="description-wrapper py-2 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h4>Description</h4>

            <div className=" description p-2 ">
              <p
                dangerouslySetInnerHTML={{ __html: productState?.description }}
                className="text-capitalize"
              ></p>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="reviews-wrapper  home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 id="review">Reviews</h3>
            <div className="review-inner-wrapper">
              <div className="review-head d-flex  justify-content-between align-items-end">
                <div>
                  <h4 className="mb-2">Customer Reviews</h4>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={20}
                      value={4}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0 t-review">Based on 2 Reviews</p>
                  </div>
                </div>
                <div>
                  <button className="text-dark text-decoration-underline btn btn-link">
                    Write a review
                  </button>
                </div>
              </div>
              <div className="review-form py-4">
                <h4>Write a review</h4>

                <div action="" className="d-flex flex-column gap-15">
                  <div>
                    <ReactStars
                      count={5}
                      size={20}
                      value={4}
                      edit={true}
                      activeColor="#ffd700"
                      onChange={(e) => {
                        setStar(e);
                      }}
                    />
                  </div>
                  <div>
                    <textarea
                      name="review"
                      id="review"
                      className="w-100 form-control"
                      cols={20}
                      rows={4}
                      placeholder="Comment..."
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                    />
                  </div>
                  <div className="d-flex justify-content-end mt-2">
                    <button
                      type="button"
                      onClick={addRatingToProduct}
                      className="button border-0"
                    >
                      Submit Review
                    </button>
                  </div>
                </div>
              </div>

              <div className="reviews mt-4">
                {productState &&
                  productState.ratings?.map((item, index) => {
                    return (
                      <div key={index} className="review">
                        <div className="d-flex align-items-center gap-10">
                          <ReactStars
                            count={5}
                            size={20}
                            value={item?.star}
                            edit={false}
                            activeColor="#ffd700"
                          />
                        </div>
                        <p>{item?.comment}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="popular-wrapper home-wrapper-2 py-2">
        <div className="row">
          <div className="col-12">
            <h6 className="section-heading">Popular Products.</h6>
          </div>
          <div className="col-12 d-flex justify-content-center flex-wrap gap-10 justify-content-md-between">
            <ProductCard data={popularProducts} />
          </div>
        </div>
      </Container>
    </>
  );
};

export default SingleProduct;
