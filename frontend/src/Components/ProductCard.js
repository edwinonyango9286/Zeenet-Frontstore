import React from "react";
import ReactStars from "react-rating-stars-component";
import { useNavigate, useParams } from "react-router-dom";
import prodcompare from "../images/prodcompare.svg";
import view from "../images/view.svg";
import addCart from "../images/add-cart.svg";
import wishlistIcon from "../images/wish.svg";
import { useDispatch } from "react-redux";
import { addProductToWishlist } from "../features/products/productSlice";

const ProductCard = (props) => {
  const param = useParams();
  const navigate = useNavigate();
  const { data } = props;
  const dispatch = useDispatch();

  const addProductToUserWishlist = (productId) => {
    dispatch(addProductToWishlist(productId));
  };

  const formatKES = (amount) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      {data &&
        data.map((item, index) => {
          return (
            <div key={index}>
              <div className="product-card position-relative">
                <div className="wishlist-icon position-absolute">
                  <button
                    className="border-0 bg-transparent"
                    onClick={(e) => {
                      e.preventDefault();
                      addProductToUserWishlist(item?._id);
                    }}
                  >
                    <img
                      src={wishlistIcon}
                      alt="Wishlist Image"
                      loading="lazy"
                      width={20}
                      height={20}
                    />
                  </button>
                </div>

                <div className="product-image">
                  <img
                    src={item.images[0]?.url}
                    className="img-fluid mx-auto border rounded object-fit "
                    alt={item?.title}
                    width={100}
                    height={130}
                    onClick={() => navigate("/product/" + item?._id)}
                  />
                  <img
                    src={item?.images[0]?.url}
                    className="img-fluid mx-auto  border rounded object-fit"
                    alt={item?.title}
                    width={100}
                    height={130}
                    onClick={() => navigate("/product/" + item?._id)}
                  />
                </div>
                <div className="product-details">
                  <h6 className="brand mb-0 mt-3">{item?.brand}</h6>
                  <h5 className="product-title mb-0">{item?.title}</h5>
                  <ReactStars
                    count={5}
                    size={18}
                    value={parseInt(item?.totalRating) ?? 0}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p className="price mb-0">{formatKES(item?.price)}</p>
                </div>
                <div className="action-bar position-absolute">
                  <div className="d-flex flex-column gap-2">
                    <img
                      src={prodcompare}
                      alt="Compare Product Image"
                      width={20}
                      height={20}
                    />

                    <img
                      src={view}
                      alt="View Product Image"
                      loading="lazy"
                      width={20}
                      height={20}
                      onClick={() => navigate("/product/" + item?._id)}
                    />
                    <img
                      src={addCart}
                      alt="Add to cart Image"
                      loading="lazy"
                      width={20}
                      height={20}
                      onClick={() => navigate("/product/" + item?._id)}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default ProductCard;
