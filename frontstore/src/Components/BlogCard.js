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
            <div key={index} className="blog-card bg-white rounded-3">
              <div className="p-2">
                <img
                  src={item?.images[0]?.url}
                  alt={item?.title}
                  className="rounded-3"
                  width={200}
                  height={200}
                />
              </div>
              <div className="blog-content">
                <p className="date">
                  {moment(item?.createdAt).format("MMMM Do YY, h:mm a")}
                </p>
                <h5
                  className="title text-uppercase"
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
          );
        })) ||
        []}
    </>
  );
};

export default BlogCard;
