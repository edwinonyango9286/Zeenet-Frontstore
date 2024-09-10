import React, { useEffect } from "react";
import { Table, Spin } from "antd";
import BreadCrumb from "../Components/BreadCrumb";
import Container from "../Components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/users/userSlice";
import { Loading3QuartersOutlined } from "@ant-design/icons";

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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const ordersState = useSelector(
    (state) => state?.auth?.orderedProducts?.orders
  );
  const loadingOrders = useSelector((state) => state?.auth?.isLoading);

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
        {loadingOrders ? (
          <div
            className="d-flex flex-row justify-content-center align-items-center"
            style={{ marginTop: "80px", marginBottom: "80px" }}
          >
            <Spin
              indicator={
                <Loading3QuartersOutlined
                  style={{
                    fontSize: 40,
                    fontWeight: "bold",
                    color: "#000",
                  }}
                  spin
                />
              }
            />
          </div>
        ) : (
          <div>
            <h5 className="my-4">Recent Orders</h5>

            <div>{<Table columns={columns} dataSource={data1} />}</div>
          </div>
        )}
      </Container>
    </>
  );
};

export default MyOrders;
