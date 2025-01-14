import React from "react";
import Meta from "../Components/Meta";
import BreadCrumb from "../Components/BreadCrumb";
import Container from "../Components/Container";

const RefundPolicy = () => {
  return (
    <>
      <Meta title={"Refund Policy"} />
      <BreadCrumb title="Refund Policy" />
      <Container class1="policy-wrapper p-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="policy rounded-3">
              <h2 className="mb-4 fw-bold">Refund Policy</h2>
              <p>
                Thank you for shopping at Zeenet. If you are not
                entirely satisfied with your purchase, we're here to help.
              </p>

              <h3 className="fw-bold">Returns</h3>
              <p>
                You have 30 calendar days to return an item from the date you
                received it. To be eligible for a return, your item must be
                unused and in the same condition that you received it. Your item
                must be in the original packaging. Your item needs to have the
                receipt or proof of purchase.
              </p>

              <h3 className="fw-bold">Refunds</h3>
              <p>
                Once we receive your item, we will inspect it and notify you
                that we have received your returned item. We will immediately
                notify you on the status of your refund after inspecting the
                item.
              </p>
              <p>
                If your return is approved, we will initiate a refund to your
                credit card (or original method of payment). You will receive
                the credit within a certain amount of days, depending on your
                card issuer's policies.
              </p>

              <h3 className="fw-bold">Shipping</h3>
              <p>
                You will be responsible for paying for your own shipping costs
                for returning your item. Shipping costs are non-refundable. If
                you receive a refund, the cost of return shipping will be
                deducted from your refund.
              </p>

              <h3 className="fw-bold">Contact Us</h3>
              <p>
                If you have any questions on how to return your item to us,
                contact us at support@zeenet.com.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default RefundPolicy;
