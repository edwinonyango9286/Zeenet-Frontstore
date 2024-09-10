import React, { useEffect, useState } from "react";
import Meta from "../Components/Meta";
import BreadCrumb from "../Components/BreadCrumb";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../Components/Container";
import { toast } from "react-toastify";

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const storedCart = localStorage.getItem("userCart");
    if (storedCart) {
      setCartData(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("userCart", JSON.stringify(cartData));
  }, [cartData]);

  useEffect(() => {
    let sum = 0;
    cartData.forEach((item) => {
      sum += item?.price * item?.quantity;
    });
    setTotalAmount(sum);
  }, [cartData]);

  const deleteACartProduct = (id) => {
    const updatedCart = cartData.filter((item) => item?.productId !== id);
    setCartData(updatedCart);
    localStorage.setItem("userCart", JSON.stringify(updatedCart));
  };
  const updateQuantity = (id, quantity) => {
    const updatedCart = cartData.map((item) => {
      if (item.productId === id) {
        item.quantity = quantity;
      }
      return item;
    });
    setCartData(updatedCart);
    localStorage.setItem("userCart", JSON.stringify(updatedCart));
    toast.success("Product quantity updated.");
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
            <div className="cart-header py-4 d-flex justify-content-between flex-wrap">
              <h4 className="cart-col-1">Product</h4>
              <h4 className="cart-col-2">Price</h4>
              <h4 className="cart-col-3">Quantity</h4>
              <h4 className="crat-col-4">Total</h4>
            </div>

            {cartData &&
              cartData.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="cart-data py-1 d-flex justify-content-between flex-wrap gap-10 align-items-center"
                  >
                    <div className="cart-col-1 d-flex flex-wrap justify-content-between align-items-center">
                      <div className="w-25">
                        <img
                          src={item?.images}
                          className="img-fluid rounded"
                          alt={item?.title}
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className="w-75">
                        <p className="mb-0">{item?.title}</p>
                        <p className="d-flex justify-content-between flex-wrap mb-0">
                          Screen Size: {item?.screensize}"
                        </p>
                      </div>
                    </div>
                    <div className="cart-col-2">
                      <h5 className="price">{formatKES(item?.price)}</h5>
                    </div>
                    <div className="cart-col-3 d-flex gap-20 flex-wrap">
                      <div>
                        <input
                          style={{
                            width: "46px",
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
                            deleteACartProduct(item?.productId);
                          }}
                        >
                          <AiFillDelete />
                        </button>
                      </div>
                    </div>
                    <div className="cart-col-4">
                      <h5 className="price">{item?.price * item?.quantity}</h5>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="col-12 py-2 mt-4">
            <div className="d-flex justify-content-between align-items-baseline">
              <Link to="/store" className="button">
                Continue Shopping
              </Link>
              <div className="d-flex flex-column align-items-end gap-10 mb-3">
                <h6>Sub Total :{formatKES(totalAmount)}</h6>
                <Link to="/checkout" className="button">
                  Proceed to checkout
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
