import React, { useEffect, useState } from "react";
import Meta from "../Components/Meta";
import BreadCrumb from "../Components/BreadCrumb";
import ProductCard from "../Components/ProductCard";
import ReactStars from "react-rating-stars-component";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
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
import CustomInput from "../Components/CustomInput";
import { addProductToWishlist } from "../features/products/productSlice";
import { ImShare2 } from "react-icons/im";


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
      brand: productState?.brand,
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

  const { products, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.product
  );

  const addProductToUserWishlist = (productId) => {
    dispatch(addProductToWishlist(productId));
  };
  return (
    <>
      <Meta title={productState?.title} />

      {isLoading ? (
        <div
          className="d-flex flex-row justify-content-center align-items-center"
          style={{ marginTop: "80px", marginBottom: "80px" }}
        >
          <Spin
            indicator={
              <LoadingOutlined
                style={{
                  fontSize: 36,
                  color: "#000",
                }}
                spin
              />
            }
          />
        </div>
      ) : (
        <div>
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
                  <div className="other-product-images d-flex flex-wrap justify-content-between gap-10">
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
                      <h4 className="title">{productState?.title}</h4>
                    </div>
                    <div className="border-bottom py-2">
                      <p className="price">
                        {formatKES(productState ? productState?.price : 0)}
                      </p>
                      <div className="d-flex align-items-center gap-2">
                        <ReactStars
                          count={5}
                          size={20}
                          value={parseInt(productState?.totalrating)}
                          edit={false}
                          activeColor="#ffd700"
                        />
                        <p className="mb-0 mt-0 t-review">
                          ({parseInt(productState?.totalrating)})
                        </p>
                      </div>
                      <a className="review-btn" href="#review">
                        Write a review
                      </a>
                    </div>
                    <div className=" border-bottom py-2">
                      <div className="d-flex gap-2 align-items-center">
                        <h3 className="product-heading">Type</h3>
                        <p className="product-data">{productState?.category}</p>
                      </div>

                      <div className="d-flex gap-2 align-items-center my-2">
                        <h3 className="product-heading">Brand</h3>
                        <p className="product-data">{productState?.brand}</p>
                      </div>

                      <div className="d-flex gap-2 align-items-center my-2">
                        <h3 className="product-heading">Category</h3>
                        <p className="product-data mb-0 mt-0">
                          {productState?.category}
                        </p>
                      </div>

                      <div className="d-flex gap-2 align-items-center my-2">
                        <h3 className="product-heading">Tags</h3>
                        <p className="product-data mb-0 mt-0">
                          {productState?.tags}
                        </p>
                      </div>

                      <div className="d-flex gap-2 align-items-center my-2">
                        <h3 className="product-heading">Availability</h3>
                        <p className="product-data mb-0 mt-0">In Stock</p>
                      </div>

                      <div className="d-flex gap-2 align-items-center mt-2 border-bottom">
                        <h3 className="product-heading mb-2"> Screen Size</h3>
                        <p className="product-data  mb-2 mt-0 ">
                          {parseFloat(productState?.screensize)}"
                        </p>
                      </div>
                      <div className="d-flex flex-column  gap-20 flex-row mt-2 mb-2">
                        <div className="d-flex flex-row  align-items-center gap-4">
                          <div>
                            <p className="mb-0 mt-0">Quantity</p>
                          </div>
                          <div>
                            <input
                              type="number"
                              name="quanity"
                              className="form-control border rounded shadow-none"
                              min={1}
                              max={10}
                              style={{ width: "50px", height: "28px" }}
                              id="quantity"
                              onChange={(e) => setQuantity(e.target.value)}
                              value={quantity}
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row  align-items-center gap-30 ">
                          <div>
                            <button
                              className="button signup border-0"
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
                              className="button  border-0"
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
                          <button
                            type="button"
                            className="border-0 bg-transparent"
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                          >
                            <VscGitCompare className="fs-5 me-2" />
                            Add to compare
                          </button>
                        </div>
                        <div>
                          <button
                            type="button"
                            className="border-0 bg-transparent"
                            onClick={(e) => {
                              e.preventDefault();
                              addProductToUserWishlist(productState?._id);
                            }}
                          >
                            <AiOutlineHeart className="fs-5 me-2" />
                            Add to wishlist
                          </button>
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
                      <div className="d-flex gap-2 align-items-center mt-2 mb-2">
                        <a
                          href="javasrcript:void(0);"
                          title="copy product link"
                          onClick={(e) => {
                            e.preventDefault();
                            copyToClipboard(window.location.href);
                          }}
                        >
                          <div className="d-flex align-items-center gap-2">
                            <ImShare2 />
                            <span> Copy product link</span>
                          </div>
                        </a>
                      </div>

                      <div className="d-flex flex-column justify-content-center align-items-center my-2">
                        <div className="mb-4">
                          <h6
                            style={{
                              fontSize: "14px",
                              fontWeight: "500",
                              lineHeight: "20px",
                            }}
                          >
                            Payment Methods
                          </h6>
                        </div>
                        <div className="d-flex  justify-content-between gap-2">
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
                <button className="button signup border-0 mb-2">
                  Description{" "}
                </button>
                <div className=" description p-2 border ">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: productState?.description,
                    }}
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
                      <h4 className="mb-2">Customer reviews</h4>
                      <div className="d-flex align-items-center gap-10">
                        <ReactStars
                          count={5}
                          size={20}
                          value={parseInt(productState?.totalrating)}
                          edit={false}
                          activeColor="#ffd700"
                        />
                        <p className="mb-0 t-review">
                          ({parseInt(productState?.totalrating)})
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="review-form py-4">
                    <h4>Write a review</h4>

                    <div action="" className="d-flex flex-column gap-15">
                      <div>
                        <ReactStars
                          count={5}
                          size={20}
                          value={parseInt(productsState?.totalrating)}
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
                          className="w-100 form-control border shadow-none"
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
                          Submit review
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
                                value={parseInt(item?.star)}
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
                <h6 className="section-heading">
                  {popularProducts ? "" : "Popular products"}
                </h6>
              </div>
              <div className="col-12">
                <div className="col-12 d-flex justify-content-center flex-wrap gap-10 justify-content-md-start">
                  <ProductCard data={popularProducts} />
                </div>
              </div>
            </div>
          </Container>
        </div>
      )}
    </>
  );
};

export default SingleProduct;
