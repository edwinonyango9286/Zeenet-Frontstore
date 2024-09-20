import React, { useEffect } from "react";
import Meta from "../Components/Meta";
import BreadCrumb from "../Components/BreadCrumb";
import cross from "../images/cross.svg";
import Container from "../Components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getUserProductWishlist } from "../features/users/userSlice";
import { removeProductFromWishlist } from "../features/products/productSlice";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistState = useSelector(
    (state) => state?.auth?.wishlistProducts?.wishlist
  );

  const isGettingWishlist = useSelector(
    (state) => state?.auth?.isGettingWishlist
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

  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" />
      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          {isGettingWishlist ? (
            <div
              className=" col-12 d-flex flex-row justify-content-center align-items-center"
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
            <div className="col-12">
              {wishlistState?.length === 0 ? (
                <div className=" d-flex align-items-center justify-content-center fs-6">
                  No data.
                </div>
              ) : (
                wishlistState?.map((item, index) => {
                  return (
                    <div className="col-3" key={index}>
                      <div className="wishlist-card  position-relative">
                        <img
                          onClick={() => {
                            removeFromWishlist(item?._id);
                          }}
                          src={cross}
                          className=" position-absolute img-fluid cross"
                          alt="cross"
                        />
                        <div className="wishlist-card-image bg-white">
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
                          <h6 className="price">{item?.price}</h6>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default Wishlist;
