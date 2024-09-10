import React, { useEffect, useState } from "react";
import BreadCrumb from "../Components/BreadCrumb";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import Meta from "../Components/Meta";
import ReactStars from "react-rating-stars-component";
import ProductCard from "../Components/ProductCard";
import Container from "../Components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/products/productSlice";
import { useNavigate } from "react-router-dom";

const Store = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productsState = useSelector((state) => state?.product?.products);
  const isLoading = useSelector((state) => state?.product?.isLoading);

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  //Filter States
  const [tag, setTag] = useState(null);
  const [category, setCategory] = useState(null);
  const [brand, setBrand] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sort, setSort] = useState(null);

  useEffect(() => {
    let newBrands = [];
    let newCategory = [];
    let newTags = [];
    for (let index = 0; index < productsState?.length; index++) {
      const element = productsState[index];
      newBrands.push(element.brand);
      newCategory.push(element.category);
      newTags.push(element.tags);
    }
    setBrands(newBrands);
    setCategories(newCategory);
    setTags(newTags);
  }, [productsState]);

  useEffect(() => {
    dispatch(
      getAllProducts({ sort, tag, brand, category, minPrice, maxPrice })
    );
  }, [sort, tag, brand, category, minPrice, maxPrice]);

  const formatKES = (amount) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      <Meta title={"Store"} />
      <BreadCrumb title="Store" />
      <Container class1="store-wrapper home-wrapper-2 ">
        <div className="row">
          <div className="col-12 d-flex flex-row justify-content-between gap-10">
            <div className="col-3 d-none d-sm-block">
              <div className="filter-card mb-2">
                <h3 className="filter-title">Shop by categories</h3>
                <div>
                  <ul className="ps-0">
                    {categories &&
                      [...new Set(categories)].map((item, index) => {
                        return (
                          <li key={index} onClick={() => setCategory(item)}>
                            {item}
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>

              <div className="filter-card mb-2">
                <h3 className="filter-title"> Filter by</h3>
                <div>
                  <h5 className="sub-title">Availability</h5>
                  <div>
                    <div className="form-check">
                      <input
                        className="form-check-input rounded-0"
                        type="checkbox"
                        value=""
                        id=""
                      />
                      <label className="form-check-label " htmlFor="">
                        In Stock (20)
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input rounded-0"
                        type="checkbox"
                        value=""
                        id=""
                      />
                      <label className="form-check-label " htmlFor="">
                        Out of Stock (1)
                      </label>
                    </div>
                  </div>

                  <h5 className="sub-title">Price</h5>
                  <div className="d-flex align-items-center gap-10">
                    <div className="form-floating">
                      <input
                        type="number"
                        className="form-control border shadow-none"
                        id="minPrice"
                        placeholder="From"
                        onChange={(e) => setMinPrice(e.target.value)}
                      />
                      <label htmlFor="floatingInput">From</label>
                    </div>
                    <div className="form-floating">
                      <input
                        type="number"
                        id="maxPrice"
                        className="form-control border shadow-none"
                        placeholder="To"
                        onChange={(e) => setMaxPrice(e.target.value)}
                      />
                      <label htmlFor="floatingInput1">To</label>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="filter-card mb-2">
                  <h3 className="filter-title">Product tags</h3>
                  <div>
                    <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                      {tags &&
                        [...new Set(tags)].map((item, index) => {
                          return (
                            <span
                              onClick={() => setTag(item)}
                              key={index}
                              className="badge text-capitalize bg-light text-secondary p-2"
                            >
                              {item}
                            </span>
                          );
                        })}
                    </div>
                  </div>

                  <div className="py-2">
                    <h3 className="filter-title">Product brands</h3>
                    <div>
                      <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                        {brands &&
                          [...new Set(brands)].map((item, index) => {
                            return (
                              <span
                                onClick={() => setBrand(item)}
                                key={index}
                                className="badge text-capitalize bg-light text-secondary p-2"
                              >
                                {item}
                              </span>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {productsState &&
                productsState.map((randomProduct, index) => {
                  if (randomProduct.tags === "Featured") {
                    return (
                      <div key={index} className="filter-card mb-0">
                        <h3 className="filter-title">Random products</h3>
                        <div>
                          <div className="random-product mb-4 d-flex justify-content-between">
                            <div
                              className="w-50"
                              onClick={() =>
                                navigate("/product/" + randomProduct?._id)
                              }
                            >
                              <img
                                src={randomProduct?.images[0]?.url}
                                className="img-fluid border mx-auto rounded"
                                alt="watch"
                                width={100}
                                height={100}
                              />
                            </div>

                            <div className="w-50">
                              <h5>{randomProduct?.title}</h5>
                              <ReactStars
                                count={5}
                                size={18}
                                value={4}
                                edit={false}
                                activeColor="#ffd700"
                              />
                              <p>{formatKES(randomProduct?.price)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
            </div>

            <div className="col-12 col-md-9">
              {isLoading ? (
                <div
                  className="d-flex flex-row justify-content-center align-items-center"
                  style={{ marginTop: "80px", marginBottom: "80px" }}
                >
                  <Spin
                    indicator={
                      <Loading3QuartersOutlined
                        style={{
                          fontSize: 40,
                          fontWeight : "bold",
                          color: "#000",
                        }}
                        spin
                      />
                    }
                  />
                </div>
              ) : (
                <div>
                  <div className="filter-sort-grid mb-2 mt-2">
                    <div className="d-flex justify-content-between align-items-center gap-10 grid">
                      <div className="d-flex d-none d-md-block">
                        <div className="d-flex justify-content-between gap-10 align-items-center">
                          <span className="d-block" style={{ width: "100px" }}>
                            Sort by :
                          </span>
                          <select
                            className="form-control form-select  sort-text border shadow-none"
                            onChange={(e) => setSort(e.target.value)}
                          >
                            <option value="title" className="sort-text">
                              Alphabetically, a-z
                            </option>
                            <option value="-title" className="sort-text">
                              Alphabetically, z-a
                            </option>
                            <option value="price" className="sort-text">
                              Price, Low to High
                            </option>
                            <option value="-price" className="sort-text">
                              Price, High to Low
                            </option>
                            <option value="createdAt" className="sort-text">
                              Date, Old to New
                            </option>
                            <option value="-createdAt" className="sort-text">
                              Date, New to Old
                            </option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <span className="mb-0">
                          {productsState.length ? productsState.length : 0}
                          Items
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pb-2">
                    <div className="d-inline-flex gap-10 justify-content-center justify-content-md-between flex-wrap">
                      <ProductCard data={productsState ? productsState : []} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Store;
