import React from "react";
import BreadCrumb from "../Components/BreadCrumb";
import Container from "../Components/Container";
import { useDispatch, useSelector } from "react-redux";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { logoutUser, resetState } from "../features/users/userSlice";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.user ?? {});

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(logoutUser());
    dispatch(resetState());
    navigate("/store");
    window.location.reload();
  };

  return (
    <>
      <BreadCrumb title="My Profile" />
      <Container class1="home-wrapper-2 py-4">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="d-flex flex-column  justify-content-start  gap-2">
              <div>
                <h4>Account</h4>
              </div>

              <div>
                <button
                  className="border-0 "
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }}
                  style={{ backgroundColor: "transparent" }}
                >
                  <div className="d-flex flex-row justify-content-start align-items-center gap-2">
                    <RiLogoutBoxRLine />
                    <p className="mb-0 mt-0">Logout</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Profile;
