import React from "react";
import { Link } from "react-router-dom";

const BreadCrumb = (props) => {
  const { title } = props;
  return (
    <div className="breadcrumb mb-0 py-2">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <p className="text-center mb-0">
              <Link to="/" className="text-dark">
                Home &nbsp;
              </Link>
              /{title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreadCrumb;
