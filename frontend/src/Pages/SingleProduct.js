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
import { addProductToWishlist } from "../features/products/productSlice";
import { ImShare2 } from "react-icons/im";
import { addProductToCart } from "../features/users/userSlice";

const SingleProduct = () => {
  const [quantity, setQuantity] = useState(1);
  const [alreadyAddedToCart, setAlreadyAddedToCart] = useState(false);

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getProductId = location.pathname.split("/")[2];
  const product = useSelector((state) => state?.product?.singleProduct);
  const products = useSelector((state) => state?.product?.products);
  const userCart = useSelector((state) => state?.user?.userCart);
  const [popularProducts, setPopularProducts] = useState([]);
  const [star, setStar] = useState(null);
  const [comment, setComment] = useState(null);

  useEffect(() => {
    dispatch(resetState());
    dispatch(getAproduct(getProductId));
    dispatch(getAllProducts());
  }, []);

  useEffect(() => {
    for (let index = 0; index < userCart?.length; index++) {
      if (getProductId === userCart[index]?.productId)
        setAlreadyAddedToCart(true);
    }
  });
  const addItemToCart = () => {
    const cartData = {
      productId: product?._id,
      quantity: quantity,
      price: product?.price,
      category: product?.category,
      title: product?.title,
      images: product?.images[0]?.url,
      screenSize: product?.screenSize,
      brand: product?.brand,
    };
    dispatch(addProductToCart(cartData));
    toast.success(`${product?.title} added to cart.`);
  };

  const props = {
    width: 600,
    height: 600,
    zoomWidth: 600,
    img: product?.images[0]?.url
      ? product?.images[0]?.url
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
    for (let index = 0; index < products.length; index++) {
      const element = products[index];
      if (element.tags === "popular") {
        data.push(element);
      }
      setPopularProducts(data);
    }
  }, [products]);

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

  const formatKES = (amount) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const { isLoading } = useSelector((state) => state.product);

  const addProductToUserWishlist = (productId) => {
    dispatch(addProductToWishlist(productId));
  };
  return (
    <>
      <Meta title={product?.title} />

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
          <BreadCrumb title={product?.title} />
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
                        src={product?.images[0]?.url}
                        className="img-fluid square-image object-fit rounded"
                        alt={product?.title}
                      />
                    </div>
                    <div>
                      <img
                        src={product?.images[0]?.url}
                        className="img-fluid square-image object-fit rounded"
                        alt={product?.title}
                      />
                    </div>
                    <div>
                      <img
                        src={product?.images[0]?.url}
                        className="img-fluid square-image object-fit rounded"
                        alt={product?.title}
                      />
                    </div>
                    <div>
                      <img
                        src={product?.images[0]?.url}
                        className="img-fluid square-image object-fit rounded"
                        alt={product?.title}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="main-product-details">
                    <div className="border-bottom">
                      <h4 className="title">{product?.title}</h4>
                    </div>
                    <div className="border-bottom py-2">
                      <p className="price">{formatKES(product?.price ?? 0)}</p>
                      <div className="d-flex align-items-center gap-2">
                        <ReactStars
                          count={5}
                          size={20}
                          value={parseInt(product?.totalRating ?? 0)}
                          edit={false}
                          activeColor="#ffd700"
                        />
                        <p className="mb-0 mt-0 t-review">
                          ({parseInt(product?.totalRating ?? 0)})
                        </p>
                      </div>
                      <a className="review-btn" href="#review">
                        Write a review
                      </a>
                    </div>
                    <div className=" border-bottom py-2">
                      <div className="d-flex gap-2 align-items-center">
                        <h3 className="product-heading">Type</h3>
                        <p className="product-data">{product?.category}</p>
                      </div>

                      <div className="d-flex gap-2 align-items-center my-2">
                        <h3 className="product-heading">Brand</h3>
                        <p className="product-data">{product?.brand}</p>
                      </div>

                      <div className="d-flex gap-2 align-items-center my-2">
                        <h3 className="product-heading">Category</h3>
                        <p className="product-data mb-0 mt-0">
                          {product?.category}
                        </p>
                      </div>

                      <div className="d-flex gap-2 align-items-center my-2">
                        <h3 className="product-heading">Tags</h3>
                        <p className="product-data mb-0 mt-0">
                          {product?.tags}
                        </p>
                      </div>

                      <div className="d-flex gap-2 align-items-center my-2">
                        <h3 className="product-heading">Availability</h3>
                        <p className="product-data mb-0 mt-0">In Stock</p>
                      </div>

                      <div className="d-flex gap-2 align-items-center mt-2">
                        <h3 className="product-heading mb-2"> Screen Size</h3>
                        <p className="product-data  mb-2 mt-0 ">
                          {parseFloat(product?.screenSize)}"
                        </p>
                      </div>
                      <div className="d-flex flex-column  gap-4 flex-row mt-3 mb-3">
                        <div className="d-flex flex-row  align-items-center gap-4 ">
                          {alreadyAddedToCart === false && (
                            <div>
                              <button
                                className="button signup border-0"
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  addItemToCart();
                                }}
                              >
                                Add to cart
                              </button>
                            </div>
                          )}

                          {alreadyAddedToCart && (
                            <div>
                              <button
                                className="button signup border-0"
                                type="button"
                                onClick={(e) => {
                                  navigate("/cart");
                                }}
                              >
                                {alreadyAddedToCart
                                  ? "View my cart"
                                  : "Add to cart"}
                              </button>
                            </div>
                          )}

                          {alreadyAddedToCart === false && (
                            <div>
                              <button
                                className="button  border-0"
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  addItemToCart();
                                  navigate("/cart");
                                }}
                              >
                                Buy it now{" "}
                              </button>
                            </div>
                          )}
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
                              addProductToUserWishlist(product?._id);
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
                            toast.success(` ${product?.title} link copied.`);
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
                      __html: product?.description,
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
                          value={parseInt(product?.totalRating ?? 0)}
                          edit={false}
                          activeColor="#ffd700"
                          {...{
                            count: 5,
                            size: 20,
                            edit: false,
                            activeColor: "#ffd700",
                          }}
                        />
                        <p className="mb-0 t-review">
                          ({parseInt(product?.totalRating ?? 0)})
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
                          value={parseInt(products?.totalRating ?? 0)}
                          edit={true}
                          activeColor="#ffd700"
                          onChange={(e) => {
                            setStar(e.target.value);
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
                            setComment(e);
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
                    {product &&
                      product.ratings?.map((item, index) => {
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
