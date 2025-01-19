import React, { useEffect, useState } from "react";
import Meta from "../Components/Meta";
import BreadCrumb from "../Components/BreadCrumb";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import Container from "../Components/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  clearUserCart,
  removeProductFromCart,
  updateProductQuantity,
} from "../features/users/userSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const userCart = useSelector((state) => state?.user?.userCart);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let sum = 0;
    userCart.forEach((item) => {
      sum += item?.price * item?.quantity;
    });
    setTotalAmount(sum);
  }, [userCart]);

  const updateQuantity = (productId, newQuantity) => {
    dispatch(updateProductQuantity({ productId, newQuantity }));
  };

  const handleClearCart = () => {
    dispatch(clearUserCart());
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
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />
      <Container class1="cart-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            {!userCart || userCart.length === 0 ? (
              <div className="d-flex flex-column align-items-center justify-content-center mt-5">
                <p className="fs-3 fw-bold">Your cart is empty</p>
                <div>
                  <Link to="/store" className="button signup">
                    Continue shopping
                  </Link>
                </div>

                <div className="d-flex flex-column justify-content-center align-items-center mt-3">
                  <p className="fs-3 fw-bold my-0">Have an account?</p>
                  <p className="text-muted fs-6 my-0 cusor-pointer">
                    Login to checkout faster.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <div className="cart-header py-4 d-flex  flex-row justify-content-between flex-wrap">
                  <h4 className="cart-col-1">Product</h4>
                  <h4 className="cart-col-3">Quantity</h4>
                  <h4 className="crat-col-4">Total</h4>
                </div>

                {userCart &&
                  userCart?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="cart-data py-1 d-flex justify-content-between flex-wrap gap-4 align-items-center"
                      >
                        <div className="cart-col-1 d-flex flex-wrap flex-lg-nowrap justify-content-between align-items-center py-2 gap-md-4 gap-2">
                          <div className="bg-white rounded-3 p-2">
                            <img
                              src={item?.images}
                              className="img-fluid rounded"
                              alt={item?.title}
                              width={136}
                              height={136}
                            />
                          </div>
                          <div>
                            <p className="my-1 fw-bold"> {item?.brand}</p>
                            <p className="mb-0">{item?.title}</p>
                            <p className="mb-0 fw-bold">
                              {formatKES(item?.price)}
                            </p>
                            <p className="d-flex justify-content-between flex-wrap mb-0">
                              Screen Size {parseFloat(item?.screenSize)}"
                            </p>
                          </div>
                        </div>
                        <div className="cart-col-3 d-flex gap-3  align-items-center flex-wrap">
                          <div>
                            <input
                              style={{
                                width: "50px",
                                height: "40px",
                              }}
                              className="form-control form-control-sm shadow-none"
                              type="number"
                              name=""
                              id=""
                              min={1}
                              max={10}
                              value={item?.quantity}
                              onChange={(e) => {
                                updateQuantity(item?.productId, e.target.value);
                              }}
                            />
                          </div>
                          <div>
                            <div className="badge rounded-circle button signup">
                              <button
                                className="bg-transparent border-0"
                                onClick={() => {
                                  dispatch(
                                    removeProductFromCart(item?.productId)
                                  );
                                }}
                              >
                                <RiDeleteBin5Line className="m-1 fs-5 hover-text" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="cart-col-4">
                          <p className="price fw-bold">
                            {formatKES(item?.price * item?.quantity)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
          <div className="col-12 py-2 mt-4">
            <div className="d-flex justify-content-between  align-items-baseline">
              <div className="d-flex   flex-column  flex-md-row gap-4 mb-4">
                {userCart?.length > 0 && (
                  <button
                    type="button"
                    className="button border-0"
                    onClick={handleClearCart}
                  >
                    Clear cart
                  </button>
                )}
                <Link to="/store" className="button signup">
                  Continue shopping
                </Link>
              </div>

              {!userCart || userCart.length === 0 ? (
                ""
              ) : (
                <div className="d-flex flex-column align-items-end gap-3 mb-3 flex-wrap">
                  <h6 className="fw-bold">
                    Sub total : {formatKES(totalAmount)}
                  </h6>
                  <Link to="/checkout" className="button signup">
                    Proceed to checkout
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
