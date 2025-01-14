import React, { useEffect } from "react";
import Meta from "../Components/Meta";
import BreadCrumb from "../Components/BreadCrumb";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Container from "../Components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getABlog } from "../features/blogs/blogSlice";
import { Spin } from "antd";
import { Loading3QuartersOutlined } from "@ant-design/icons";

const Blog = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const blogId = location.pathname.split("/")[3];

  useEffect(() => {
    dispatch(getABlog(blogId));
  }, [blogId]);

  const blog = useSelector((state) => state?.blog?.blog);
  const loadingGetBlog = useSelector(
    (state) => state?.blog?.isLoading?.getABlog
  );

  return (
    <>
      <Meta title={blog?.title} />

      {loadingGetBlog ? (
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
          <BreadCrumb title={blog?.title} className="text-capitalize" />
          <Container class1="home-wrapper-2 py-2">
            <div className="row">
                <div className="col-12 col-lg-6">
                <div className="single-blog-card">
                  <Link
                    to="/blogs"
                    className="d-flex align-items-center gap-10"
                  >
                    <AiOutlineArrowLeft className="fs-4" />
                    Go Back To blogs
                  </Link>

                  <h3 className="text-uppercase">{blog?.title}</h3>
                  <div className="d-flex flex-col">
                    <div>
                      <img
                        src={blog?.images[0]?.url}
                        alt={blog?.title}
                        className="img-fluid  my-4 rounded-4  w-md-100 object-fit-cover"
                        height={100}
                      />
                    </div>
                  </div>
                  <div>
                    <p
                      dangerouslySetInnerHTML={{ __html: blog?.description }}
                      className="text-capitalize"
                    ></p>
                  </div>
                  </div>
              </div>
            </div>
          </Container>
        </div>
      )}
    </>
  );
};

export default Blog;
