import React, { useEffect } from "react";
import Meta from "../Components/Meta";
import BreadCrumb from "../Components/BreadCrumb";
import cross from "../images/cross.svg";
import Container from "../Components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getUserProductWishlist } from "../features/users/userSlice";
import { debounce } from "lodash";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistState = useSelector(
    (state) => state.auth?.wishlistProducts?.wishlist
  );

  useEffect(() => {
    dispatch(getUserProductWishlist());
  }, [dispatch]);

  const removeFromWishlist = debounce((id) => {
    dispatch(removeFromWishlist(id));
    dispatch(getUserProductWishlist());
  }, 500);

  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" />
      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            {wishlistState?.length === 0 ? (
              <div className="text-center fs-3">
                No products in your wishlist.
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
                          src={item?.images[0].url || "placeholder-image-url"}
                          className="img-fluid d-block mx-auto"
                          alt={item?.images[0].url ? "" : "Product Image"}
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
        </div>
      </Container>
    </>
  );
};

export default Wishlist;
