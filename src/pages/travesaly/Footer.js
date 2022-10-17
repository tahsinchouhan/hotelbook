import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
// import covid from "../../assets/img/covid-19.png";
// import map from "../../assets/img/Map.svg";
import logo from "../../assets/img/logo.png";

function Footer() {
  const history = useHistory();
  const goForRegistration = () => {
    history.push("/registrationguide");
  };
  return (
    <>
      <footer className="footer pb-3">
        <Container className="pt-4">
          <h3 className="footer__title pt-5 mb-5">Important Info</h3>
          <Row>
            <Col sm={4} md={4}>
              <div className="footer__block">
                <div className="footer__item">
                  <h6 className="footer__item-subtitle">For Visitors</h6>
                </div>
                <div className="footer__item">
                  <h5 className="footer__item-title"> Cab Operators List</h5>
                  <small>View cab operators Details</small>
                </div>
                <div className="footer__item">
                  <h5 className="footer__item-title"> Tour Operators List</h5>
                  <small>View tour operators Details</small>
                </div>

                <div className="footer__item">
                  <h5 className="footer__item-title"> Promotional Content</h5>
                  <small>Checkout awesome things that we offer </small>
                </div>

                {/* <div className="footer__item">
                  <Link to="/covidresponse" className="link">
                    <h5 className="footer__item-title"> Covid-19 Response</h5>
                 
                  <small>Health and Safety Update</small>
                </div> */}
                <div className="footer__item">
                  <h5 className="footer__item-title">Booking Details</h5>

                  <small>Know how to book or cancel</small>
                </div>
              </div>
            </Col>
            <Col sm={4} md={4}>
              <div className="footer__block">
                <div className="footer__item">
                  <h6 className="footer__item-subtitle">
                    Vendor & Organization Registration
                  </h6>
                </div>
                <div className="footer__item">
                  <h5 className="footer__item-title">Registration Form</h5>

                  <small>Vendor & Organization Registration</small>
                </div>
                <div className="footer__item">
                  <h5 className="footer__item-title">Booking Details</h5>

                  <small>Map, Guides and Packages </small>
                </div>
              </div>
            </Col>

            <Col sm={4} md={4}>
              <div className="footer__logo">
                <div className={`header__logo`}>
                  <img
                    src={logo}
                    id="logo"
                    alt="logo"
                    style={{ height: 200, width: 200 }}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}

export default Footer;
