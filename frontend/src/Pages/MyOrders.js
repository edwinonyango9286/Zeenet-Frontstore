import React, { useEffect } from "react";
import { Table } from "antd";
import BreadCrumb from "../Components/BreadCrumb";
import Container from "../Components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/users/userSlice";

const columns = [
  {
    title: "SNO",
    dataIndex: "key",
  },
  {
    title: "OrderId",
    dataIndex: "orderId",
  },
  {
    title: "Products",
    dataIndex: "products",
  },
  {
    title: "Total Amount",
    dataIndex: "totalAmount",
  },
  {
    title: "Amount After Discount",
    dataIndex: "amountAfterDiscount",
  },

  {
    title: "Status",
    dataIndex: "status",
  },
];

const MyOrders = () => {
  const getTokenFromLocalStorge = localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null;

  const config2 = {
    headers: {
      Authorization: `Bearer ${
        getTokenFromLocalStorge !== null ? getTokenFromLocalStorge.token : ""
      }`,
      Accept: "application/json",
    },
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders(config2));
  }, []);

  const ordersState = useSelector(
    (state) => state?.auth?.orderedProducts?.orders
  );
  const loading = useSelector((state) => state?.auth?.isLoading);

  const data1 = [];
  for (let i = 0; i < ordersState?.length; i++) {
    data1.push({
      key: i + 1,
      orderId: ordersState[i]?._id,
      totalAmount: ordersState[i]?.totalPrice,
      amountAfterDiscount: ordersState[i]?.totalPriceAfterDiscount,
      status: ordersState[i]?.orderStatus,

      products: (
        <ul>
          {ordersState[i]?.orderedItems.map((item) => (
            <li key={item?.product?._id}>
              {item?.product?.title} (Quantity: {item?.quantity})
            </li>
          ))}
        </ul>
      ),
    });
  }

  return (
    <>
      <BreadCrumb title="My Orders" />
      <Container class1="py-4">
        <div>
          <h5 className="my-4">Recent Orders</h5>
          {loading ? (
            <div className="d-flex justify-content-center align-items-center">
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "400",
                  letterSpacing: "0.3px",
                  lineHeight: "20px",
                }}
              >
                {" "}
                Laoding...
              </p>
            </div>
          ) : (
            <div>{<Table columns={columns} dataSource={data1} />}</div>
          )}
        </div>
      </Container>
    </>
  );
};

export default MyOrders;
