import React, { useEffect, useState } from "react";
import BreadCrumb from "../Components/BreadCrumb";
import Container from "../Components/Container";
import { useDispatch, useSelector } from "react-redux";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { logoutUser, resetState } from "../features/users/userSlice";
import Cookies from "js-cookie";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(null);

  const isSuccessLogoutUser = useSelector(
    (state) => state?.user?.isSuccess?.logoutUser
  );
  const message = useSelector((state) => state?.user?.message);

  useEffect(() => {
    if (isSuccessLogoutUser && message) {
      navigate("/store");
      dispatch(resetState());
    }
  }, [isSuccessLogoutUser, message]);

  const handleLogout = async () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    const userFirstName = Cookies.get("firstName");
    const userLastName = Cookies.get("lastName");
    const userEmail = Cookies.get("email");
    const userPhoneNumber = Cookies.get("phoneNumber");
    if (userFirstName) setFirstName(userFirstName);
    if (userLastName) setLastName(userLastName);
    if (userEmail) setEmail(userEmail);
    if (userPhoneNumber) setPhoneNumber(userPhoneNumber);
  }, []);

  return (
    <>
      <BreadCrumb title="My Profile" />
      <Container class1="home-wrapper-2 py-4">
        <div className="row">
          <div className="col-12 d-flex flex-row flex-wrap flex-md-nowrap gap-4">
            <div className=" col-md-6 d-flex flex-column gap-4">
              <div className="d-flex flex-column  justify-content-start  gap-2">
                <div>
                  <h4>Account</h4>
                </div>

                <div>
                  <button
                    className="border-0 "
                    type="button"
                    onClick={handleLogout}
                    style={{ backgroundColor: "transparent" }}
                  >
                    <div className="d-flex flex-row justify-content-start align-items-center gap-2">
                      <RiLogoutBoxRLine />
                      <p className="mb-0 mt-0">Logout</p>
                    </div>
                  </button>
                </div>
              </div>

              <div className="d-flex flex-column gap-2">
                <h4>Order history</h4>
                <h6>You haven't placed any order yet.</h6>
              </div>
            </div>

            <div className="col-md-6 d-flex flex-column justify-content-start justify-content-md-end align-items-md-center">
              <div className="d-flex gap-2 justify-content-start flex-column">
                <h4 className="mt-0 md-0">Account details</h4>
                <h6 className="text-capitalize mb-0 mt-0">
                  Name:{"  "} {firstName + " " + lastName}
                </h6>
                <h6 className="mb-0 mt-0">
                  {" "}
                  Email: {"  "} {email}
                </h6>
                <h6 className="mb-0 mt-0">
                  {" "}
                  Phone: {"  "} {phoneNumber}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Profile;
