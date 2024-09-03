import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const BlogCard = (props) => {
  const { data } = props;

  return (
    <>
      {data &&
        data?.map((item, index) => {
          return (
            <div key={index} className="blog-card">
              <div className="card-image">
                <img
                  src={item.images[0]?.url}
                  alt="Blog Image"
                  className="img-fluid"
                  width={100}
                  height={100}
                />
              </div>
              <div className="blog-content">
                <p className="date">
                  {moment(item?.createdAt).format("MMMM Do YY, h:mm a")}
                </p>
                <h5 className="title text-uppercase">{item?.title}</h5>
                <p
                  className="desc text-capitalize"
                  dangerouslySetInnerHTML={{
                    __html: item?.description.substr(0, 70) + "...",
                  }}
                ></p>
                <Link to={`/blogs/singleblog/${item?._id}`} className="button">
                  Read More
                </Link>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default BlogCard;
