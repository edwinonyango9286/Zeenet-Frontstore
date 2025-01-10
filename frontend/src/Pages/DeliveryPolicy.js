import React from "react";
import Meta from "../Components/Meta";
import BreadCrumb from "../Components/BreadCrumb";
import Container from "../Components/Container";

const DeliveryPolicy = () => {
  return (
    <>
      <Meta title={"Delivery Policy"} />
      <BreadCrumb title="Delivery Policy" />
      <Container class1="policy-wrapper p-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="policy rounded-3">
              <h2 className="mb-4 fw-bold">Delivery Policy</h2>
              <p>
                Welcome to Zeenet. This Delivery Policy outlines the delivery
                procedures and policies for our products within Kenya. If you
                have any questions or concerns, please contact us at
                delivery@Zeenet.com.
              </p>

              <h3 className="fw-bold">1. Order Processing</h3>
              <p>
                All orders are processed within 1-2 business days. Orders are
                not processed or delivered on weekends or public holidays. If we
                are experiencing a high volume of orders, processing times may
                be delayed by a few days. Please allow additional time for
                delivery. If there will be a significant delay in the delivery
                of your order, we will contact you via email or telephone.
              </p>

              <h3 className="fw-bold">2. Delivery Methods & Times</h3>
              <p>We offer the following delivery methods within Kenya:</p>
              <ul>
                <li>
                  <strong>Standard Delivery:</strong> 3-5 business days
                </li>
                <li>
                  <strong>Express Delivery:</strong> 1-2 business days
                </li>
                <li>
                  <strong>Same Day Delivery:</strong> Available in select
                  locations for orders placed before 12 PM local time
                </li>
              </ul>
              <p>
                Delivery times are estimates and not guaranteed. Delays may
                occur due to unforeseen circumstances such as weather conditions
                or transportation issues.
              </p>

              <h3 className="fw-bold">3. Delivery Charges</h3>
              <p>
                Delivery charges for your order will be calculated and displayed
                at checkout. The charges are based on the delivery method chosen
                and the destination of the order within Kenya.
              </p>

              <h3 className="fw-bold">
                4. Shipment Confirmation & Order Tracking
              </h3>
              <p>
                You will receive a Shipment Confirmation email once your order
                has shipped containing your tracking number(s). The tracking
                number will be active within 24 hours.
              </p>

              <h3 className="fw-bold">5. Delivery Locations</h3>
              <p>
                We currently deliver to the following locations within Kenya:
              </p>
              <ul>
                <li>Nairobi</li>
                <li>Mombasa</li>
                <li>Kisumu</li>
                <li>Nakuru</li>
                <li>Eldoret</li>
                <li>Thika</li>
                <li>Nyeri</li>
                <li>Other major towns and cities</li>
              </ul>
              <p>
                If your location is not listed, please contact us at
                delivery@Zeenet.com to inquire about delivery options.
              </p>

              <h3 className="fw-bold">6. Delivery Issues</h3>
              <p>
                If you experience any issues with your delivery, please contact
                us immediately at delivery@zeenet.com. We will work with the
                delivery carrier to resolve any issues as quickly as possible.
              </p>

              <h3 className="fw-bold">7. Contact Us</h3>
              <p>
                If you have any questions about our Delivery Policy or need
                assistance with your order, please contact us at
                delivery@zeenet.com or by mail to:
              </p>
              <address>
                Zeenet
                <br />
                Kimathi House, Shop 312 7th floor
                <br />
                Nairobi CBD
                <br />
                Kenya
              </address>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default DeliveryPolicy;
