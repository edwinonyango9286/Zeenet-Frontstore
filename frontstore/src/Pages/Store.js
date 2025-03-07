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
  const products = useSelector((state) => state?.product?.products);
  const isLoading = useSelector(
    (state) => state?.product?.isLoading?.getAllProducts
  );

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  // Pagination state

  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const itemsPerPage = 20;

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
    for (let index = 0; index < products?.length; index++) {
      const element = products[index];
      newBrands.push(element.brand?.title);
      newCategory.push(element.category?.title);
      newTags.push(element.tags);
    }
    setBrands(newBrands);
    setCategories(newCategory);
    setTags(newTags);
  }, [products]);

  useEffect(() => {
    dispatch(
      getAllProducts({
        sort,
        tag,
        brand,
        category,
        minPrice,
        maxPrice,
        limit: itemsPerPage,
        offset: (currentPage - 1) * itemsPerPage,
      })
    );
  }, [sort, tag, brand, category, minPrice, maxPrice]);

  useEffect(() => {
    if (products) {
      setTotalProducts(products.length);
    }
  }, [products]);

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
      <Meta title={"Store"} />
      <BreadCrumb title="Store" />
      <Container class1="store-wrapper home-wrapper-2 ">
        <div className="row">
          <div className="col-12 d-flex flex-row justify-content-between gap-2">
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
                  <div className="d-flex align-items-center gap-2">
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
                    <div className="product-tags d-flex flex-wrap align-items-center gap-2">
                      {tags &&
                        [...new Set(tags)].map((item, index) => {
                          return (
                            <span
                              onClick={() => setTag(item)}
                              style={{
                                cursor: "pointer",
                              }}
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
                      <div className="product-tags d-flex flex-wrap align-items-center gap-2">
                        {brands &&
                          [...new Set(brands)].map((item, index) => {
                            return (
                              <span
                                onClick={() => setBrand(item)}
                                style={{ cursor: "pointer" }}
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

              <div>
                {products &&
                  products.map((randomProduct, index) => {
                    if (randomProduct.tags === "Popular") {
                      return (
                        <div key={index} className="filter-card mb-0">
                          <div>
                            <div className="random-product mb-2 d-flex gap-1">
                              <div
                                className="w-50"
                                onClick={() =>
                                  navigate("/product/" + randomProduct?._id)
                                }
                              >
                                <img
                                  src={randomProduct?.images[0]?.url}
                                  className="img-fluid mx-auto rounded mb-3"
                                  alt="watch"
                                  width={100}
                                  height={100}
                                />
                              </div>

                              <div className="w-50">
                                <h6 className="fw-bold">
                                  {randomProduct?.title}
                                </h6>
                                <ReactStars
                                  count={5}
                                  size={18}
                                  value={4}
                                  edit={false}
                                  activeColor="#ffd700"
                                />
                                <p className="fw-bold">
                                  {formatKES(randomProduct?.price)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
              </div>
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
                          fontWeight: "bold",
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
                    <div className="d-flex justify-content-between align-items-center gap-2 grid">
                      <div className="d-flex d-none d-md-block">
                        <div className="d-flex justify-content-between gap-2 align-items-center">
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
                              Price, low to high
                            </option>
                            <option value="-price" className="sort-text">
                              Price, high to low
                            </option>
                            <option value="createdAt" className="sort-text">
                              Date, old to new
                            </option>
                            <option value="-createdAt" className="sort-text">
                              Date, new to old
                            </option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <span className="mb-0">
                          {products ? products.length : 0} {""}
                          products
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pb-2">
                    <div className="d-inline-flex justify-content-start flex-wrap  gap-2">
                      <ProductCard data={products ? products : []} />
                    </div>
                    <div className="d-flex  justify-content-center gap-2 align-items-center mt-4">
                      {Array.from({ length: totalPages }, (_, index) => (
                        <button
                          key={index}
                          type="button"
                          className={`signup rounded ${
                            currentPage === index + 1 ? "" : "bg-white"
                          }`}
                          style={{
                            width: "34px",
                            height: "34px",
                            text: "White",
                          }}
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </button>
                      ))}
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

// Breakpoint	Screen Width
// xs	< 576px
// sm	≥ 576px and < 768px
// md	≥ 768px and < 992px
// lg	≥ 992px and < 1200px
// xl	≥ 1200px
