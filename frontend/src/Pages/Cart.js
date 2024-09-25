import React, { useEffect, useState } from "react";
import Meta from "../Components/Meta";
import BreadCrumb from "../Components/BreadCrumb";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../Components/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  removeProductFromCart,
  updateProductQuantity,
} from "../features/users/userSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state?.user?.userCart);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let sum = 0;
    cartData.forEach((item) => {
      sum += item?.price * item?.quantity;
    });
    setTotalAmount(sum);
  }, [cartData]);

  const updateQuantity = (productId, newQuantity) => {
    dispatch(updateProductQuantity({ productId, newQuantity }));
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
            <div className="cart-header py-4 d-flex  flex-row justify-content-between flex-wrap">
              <h4 className="cart-col-1">Product</h4>
              <h4 className="cart-col-3">Quantity</h4>
              <h4 className="crat-col-4">Total</h4>
            </div>

            {cartData &&
              cartData.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="cart-data py-1 d-flex justify-content-between flex-wrap gap-4 align-items-center"
                  >
                    <div className="cart-col-1 d-flex flex-wrap flex-lg-nowrap justify-content-between align-items-center py-2 gap-md-4 gap-2">
                      <div>
                        <img
                          src={item?.images}
                          className="img-fluid rounded"
                          alt={item?.title}
                          width={136}
                          height={136}
                        />
                      </div>
                      <div>
                        <p className="mt-0">{item?.category}</p>
                        <p className="mb-0">{item?.title}</p>
                        <p className="mb-0">{formatKES(item?.price)}</p>
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
                            height: "30px",
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
                        <button
                          className=" fs-4 text-danger bg-transparent border-0 m-0"
                          onClick={() => {
                            dispatch(removeProductFromCart(item?.productId));
                          }}
                        >
                          <AiFillDelete />
                        </button>
                      </div>
                    </div>
                    <div className="cart-col-4">
                      <h5 className="price">
                        {formatKES(item?.price * item?.quantity)}
                      </h5>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="col-12 py-2 mt-4">
            <div className="d-flex justify-content-between align-items-baseline">
              <Link to="/store" className="button signup">
                Continue shopping
              </Link>
              <div className="d-flex flex-column align-items-end gap-10 mb-3">
                <h6>Sub total {formatKES(totalAmount)}</h6>
                <Link to="/checkout" className="button signup">
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
