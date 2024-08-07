import React from "react";
import BreadCrumb from "../Components/BreadCrumb";
import Meta from "../Components/Meta";
import watch1 from "../images/watch-1.avif";
import cross from "../images/cross.svg";
import Container from "../Components/Container";
const CompareProducts = () => {
  return (
    <>
      <Meta title={"Compare Products"} />
      <BreadCrumb title="Compare Products" />
      <Container clas1="compare-products-wrapper home-wrapper-2 py-5 ">
        <div className="row">
          <div className="col-3">
            <div className="compare-product-card position-relative">
              <img
                src={cross}
                alt="cross"
                className="position-absolute cross img-fluid" loading="lazy"
              />

              <div className="product-card-image">
                <img src={watch1} alt="watch" className="img-fluid" loading="lazy" />
              </div>

              <div className="compare-product-details">
                <h5 className="title">
                  The Eternal Ticker: A Timepiece for Your Journey
                </h5>
                <h6 className="price">Ksh 1000</h6>
                <div className="product-details">
                  <h6>Brand:</h6>
                  <p>Havels</p>
                </div>

                <div className="product-details">
                  <h6>Type:</h6>
                  <p>Watch</p>
                </div>

                <div className="product-details">
                  <h6>Availability:</h6>
                  <p>In Stock</p>
                </div>
                <div className="product-details">
                  <h6>Screen Size:</h6>
                </div>
                <div className="product-details">
                  <h6>Size:</h6>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="compare-product-card position-relative">
              <img
                src={cross}
                alt="cross"
                className="position-absolute cross img-fluid" loading="lazy"
              />

              <div className="product-card-image">
                <img src={watch1} alt="watch" className="img-fluid" loading="lazy" />
              </div>

              <div className="compare-product-details">
                <h5 className="title">
                  The Eternal Ticker: A Timepiece for Your Journey
                </h5>
                <h6 className="price">Ksh 1000</h6>
                <div className="product-details">
                  <h6>Brand:</h6>
                  <p>Havels</p>
                </div>

                <div className="product-details">
                  <h6>Type:</h6>
                  <p>Watch</p>
                </div>

                <div className="product-details">
                  <h6>Availability:</h6>
                  <p>In Stock</p>
                </div>
                <div className="product-details">
                  <h6>Screen Size:</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default CompareProducts;
