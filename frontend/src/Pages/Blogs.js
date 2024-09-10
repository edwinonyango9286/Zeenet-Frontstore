import React, { useEffect } from "react";
import BreadCrumb from "../Components/BreadCrumb";
import Meta from "../Components/Meta";
import BlogCard from "../Components/BlogCard";
import Container from "../Components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blogs/blogSlice";

const Blogs = () => {
  const dispatch = useDispatch();
  const blogState = useSelector((state) => state.blog?.blogs);

  useEffect(() => {
    dispatch(getAllBlogs());
  }, []);

  return (
    <>
      <Meta title={"Blogs"} />
      <BreadCrumb title="News" />
      <Container class1="home-wrapper-2 py-2">
        <div className="row">
          <div className="col-12 d-flex gap-10 ">
            <div className="col-3 d-none d-md-block d-lg-block d-lg-block d-xl-block d-xxl-block">
              <div className="filter-card mb-2">
                <h3 className="filter-title">Shop By Categories</h3>
                <div>
                  <ul className="ps-0">
                    <li>watch</li>
                    <li>Tv</li>
                    <li>Camera</li>
                    <li>Laptop</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-9 col-lg-9 col-xl-9 col-xxl-9 d-flex gap-10">
              <BlogCard data={blogState ? blogState : []} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Blogs;
