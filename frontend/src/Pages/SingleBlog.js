import React, { useEffect } from "react";
import Meta from "../Components/Meta";
import BreadCrumb from "../Components/BreadCrumb";
import blogImage from "../images/blog-1.jpg";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Container from "../Components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getABlog } from "../features/blogs/blogSlice";

const SingleBlog = () => {
  const blogState = useSelector((state) => state?.blog?.singleBlog);
  const dispatch = useDispatch();
  const location = useLocation();
  const getBlogId = location.pathname.split("/")[3];

  useEffect(() => {
    getblog();
  }, []);

  const getblog = () => {
    dispatch(getABlog(getBlogId));
  };

  return (
    <>
      <Meta title={blogState?.title} />
      <BreadCrumb title={blogState?.title} className="text-capitalize" />
      <Container class1="home-wrapper-2 py-2">
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="single-blog-card">
              <Link to="/blogs" className="d-flex align-items-center gap-10">
                <AiOutlineArrowLeft className="fs-4" />
                Go Back To blogs
              </Link>

              <h3 className="text-uppercase">{blogState?.title}</h3>
              <div className="d-flex flex-col">
                <div>

                  <img
                    src={
                      blogState?.images[0]?.url
                        ? blogState?.images[0]?.url
                        : blogImage
                    }
                    alt="blog image"
                    className="img-fluid  my-4 rounded-4  w-md-100 object-fit-cover"
                    height={100}
                  />
                </div>
              </div>

              <div>
                <p
                  dangerouslySetInnerHTML={{ __html: blogState?.description }}
                  className="text-capitalize"
                ></p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SingleBlog;
