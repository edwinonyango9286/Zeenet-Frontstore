import React, { useEffect } from "react";
import BreadCrumb from "../Components/BreadCrumb";
import Meta from "../Components/Meta";
import BlogCard from "../Components/BlogCard";
import Container from "../Components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs, reseBlogState } from "../features/blogs/blogSlice";
import { Spin } from "antd";
import { Loading3QuartersOutlined } from "@ant-design/icons";

const Blogs = () => {
  const dispatch = useDispatch();
  const blogState = useSelector((state) => state?.blog?.blogs);
  const loadingGetAllBlogs = useSelector(
    (state) => state?.blog?.isLoading?.getAllBlogs
  );

  useEffect(() => {
    dispatch(reseBlogState());
    dispatch(getAllBlogs());
  }, [dispatch]);

  return (
    <>
      <Meta title={"Blogs"} />
      {loadingGetAllBlogs ? (
        <div
          className="d-flex flex-row justify-content-center align-items-center"
          style={{ marginTop: "80px", marginBottom: "80px" }}
        >
          <Spin
            indicator={
              <Loading3QuartersOutlined
                style={{
                  fontSize: 36,
                  color: "#000",
                }}
                spin
              />
            }
          />
        </div>
      ) : (
        <div>
          <BreadCrumb title="News" />
          <Container class1="home-wrapper-2 py-2">
            <div className="row">
              <div className="col-12 d-flex gap-10 ">
                <div className="col-3 d-none d-md-block">
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

                <div className="col-12 col-md-9 d-flex gap-10">
                  <BlogCard data={blogState ? blogState : []} />
                </div>
              </div>
            </div>
          </Container>
        </div>
      )}
    </>
  );
};

export default Blogs;
