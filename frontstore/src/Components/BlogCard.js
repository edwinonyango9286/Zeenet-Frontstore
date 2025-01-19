import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const BlogCard = (props) => {
  const { data } = props;

  return (
    <>
      {(Array.isArray(data) &&
        data?.map((item, index) => {
          return (
            <div key={index} className="bg-white rounded">
              <div className="blog-card">
                <div className="p-2">
                  <img
                    src={item?.images[0]?.url}
                    alt={item?.title}
                    className="img-fluid rounded-3"
                    width={200}
                    height={200}
                  />
                </div>
                <div className="blog-content">
                  <p className="date">
                    {moment(item?.createdAt).format("MMMM Do YY, h:mm a")}
                  </p>
                  <h5
                    className="title text-uppercase fw-bold"
                    dangerouslySetInnerHTML={{
                      __html: item?.description.substr(0, 14) + "...",
                    }}
                  ></h5>
                  <p
                    className="desc text-capitalize"
                    dangerouslySetInnerHTML={{
                      __html: item?.description.substr(0, 70) + "...",
                    }}
                  ></p>
                  <Link to={`/blogs/blog/${item?._id}`} className="button">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          );
        })) ||
        []}
    </>
  );
};

export default BlogCard;
