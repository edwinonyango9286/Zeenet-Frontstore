import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

const SpecialProducts = (props) => {
  const { brand, title, totalRating, price, sold, quantity, image, id } = props;
  return (
    <>
      <div className="mb-2">
        <div className="special-product-card shadow">
          <div className="d-flex flex-row justify-content-start gap-2">
            <div>
              <img src={image} className="img-fluid" alt={title} />
            </div>
            <div className="special-product-content">
              <h5 className="brand fw-bold text-danger mt-2">{brand}</h5>
              <h6 className="title fw-bold">{title}</h6>
              <ReactStars
                count={5}
                size={24}
                value={parseInt(totalRating ?? 0)}
                edit={false}
                activeColor="#ffd700"
              />
              <p className="price fw-bold">
                <span className="text-danger">{price}</span>&nbsp;
                <strike>{price}</strike>
              </p>
              <div className="discount-till d-flex align-items-center gap-10">
                <p className="mb-0 fw-normal">5 days</p>
                <div className="d-flex align-items-center gap-1">
                  <span
                    className="badge rounded-circle  bg-danger"
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    1
                  </span>

                  <span
                    className="badge rounded-circle  bg-danger"
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    1
                  </span>

                  <span
                    className="badge rounded-circle  bg-danger"
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    1
                  </span>
                </div>
              </div>
              <div className="prod-count my-3">
                <p>Products: {quantity}</p>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: quantity / quantity + sold * 100 + "%" }}
                    aria-valuenow={quantity / quantity + sold * 100}
                    aria-valuemin={quantity}
                    aria-valuemax={sold + quantity}
                  ></div>
                </div>
              </div>
              <Link to={"/product/" + id} className="button fw-bold">
                Choose options
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecialProducts;
