import React, { useEffect, useState } from "react";
import Meta from "../Components/Meta";
import BreadCrumb from "../Components/BreadCrumb";
import cross from "../images/cross.svg";
import Container from "../Components/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToCart,
  getUserProductWishlist,
} from "../features/users/userSlice";
import { removeProductFromWishlist } from "../features/products/productSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Wishlist = () => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const wishlist = useSelector(
    (state) => state?.user?.wishlistProducts?.wishlist
  );

  useEffect(() => {
    dispatch(getUserProductWishlist());
  }, []);

  const removeFromWishlist = (productId) => {
    dispatch(removeProductFromWishlist(productId));
    setTimeout(() => {
      dispatch(getUserProductWishlist());
    }, 200);
  };

  const addItemToCart = (product) => {
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

  const formatKES = (amount) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" />
      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12 d-flex  gap-4 flex-wrap justify-content-md-start gap-md-5 gap-lg-4">
            {wishlist?.length === 0 ? (
              <div className=" col-12 d-flex flex-column align-items-center justify-content-center fs-6 gap-4">
                No products were added to your wishlist.
                <Link to="/store" className="button signup">
                  Continue shopping
                </Link>
              </div>
            ) : (
              wishlist?.map((item, index) => {
                return (
                  <div className="col-12 col-md-4 col-lg-2" key={index}>
                    <div className="wishlist-card  position-relative">
                      <img
                        onClick={() => {
                          removeFromWishlist(item?._id);
                        }}
                        title="Remove product from wishlist."
                        src={cross}
                        className=" position-absolute img-fluid cross"
                        alt="cross"
                        width={50}
                        height={50}
                      />
                      <div className="bg-white pt-4  pt-2 rounded">
                        <div>
                          <img
                            src={item?.images[0]?.url || "Product image."}
                            className="img-fluid d-block mx-auto"
                            alt={
                              item?.images[0]?.url
                                ? item?.images[0]?.url
                                : "Product image"
                            }
                            width={140}
                            height={140}
                          />
                        </div>
                        <div className="py-3 px-3 ">
                          <h5 className="title">{item?.title}</h5>
                          <h6 className="price">{formatKES(item?.price)}</h6>

                          <div>
                            <button
                              className="button signup border-0"
                              type="button"
                              onClick={() => addItemToCart(item)}
                            >
                              Add to cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Wishlist;
