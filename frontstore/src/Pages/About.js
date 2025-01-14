import React from "react";
import Meta from "../Components/Meta";
import BreadCrumb from "../Components/BreadCrumb";
import Container from "../Components/Container";

const About = () => {
  return (
    <>
      <Meta title={"About zeenet"} />
      <BreadCrumb title="About zeenet" />

      <Container className="mt-5">
        <div className="row">
          <div className="col-12">
            <div className="policy rounded-3">
              <h2 className="mb-4 fw-bold">About Zeenet</h2>
              <p>
                Welcome to Zeenet, your number one source for electronic
                devices. We're dedicated to giving you the very best of
                electronics, with a focus on dependability, customer service,
                and uniqueness.
              </p>
              <p>
                Founded in 2025, Zeenet has come a long way from its beginnings.
                When we first started out, our passion for providing the best
                electronice devices drove us to do intense research and gave us
                the impetus to turn hard work and inspiration into a booming
                online store. We now serve customers all over the world and are
                thrilled to be a part of the eco-friendly wing of the fashion
                industry.
              </p>
              <p>
                We hope you enjoy our products as much as we enjoy offering them
                to you. If you have any questions or comments, please don't
                hesitate to contact us.
              </p>
              <p>
                Sincerely,
                <br />
                Edwin Onyango, Founder
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default About;
