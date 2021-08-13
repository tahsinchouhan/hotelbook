import React, { useState } from "react";
import { Container, Row, Button, Form, Col, Card } from "react-bootstrap";

import { Link } from "react-router-dom";
import ButtonComponent from "../../containers/Button";
import { NavLink, useHistory } from "react-router-dom";

import { FaArrowLeft } from "react-icons/fa";

const button_Data = [
  {
    name: "Male",
    value: "Male",
  },
  {
    name: "Female",
    value: "Female",
  },
];

function Locations() {
  const [activeButton, setActiveButton] = useState(button_Data[0].name);
  const [data, setData] = useState();

  const onSideBtnClick = (e) => {
    const name = e.target.name;
    setActiveButton(name);
  };

  return (
    <>
      <div>
        <div className="dmpass-div">
          {/* <Container className="dm-kangervilla">
            <FaArrowLeft className="kanger-arrow" />
            <div className="kangervilla">
              <span className="kanger-valley">
                Tickets for Kanger Valley
                <br />
                30th July, 2021
              </span>
            </div>
          </Container> */}
        </div>       
        <Container className="dmpass-form mt-5">
          <Row className="dmpassData">
            <h3 style={{ fontWeight: "bolder", textAlign: "center" }}>
              Select Locations
            </h3>

            <div
              className="location_pass d-flex"
              style={{
                border: "1px solid red",
                backgroundColor: " #F8F8F8",
                marginBottom: "15px",
              }}
            >
              <Form.Check
                type="radio"
                label="Chitrakote"
                name="formHorizontalRadios"
                id="formHorizontalRadios2"
                style={{ margin: "8px", color: "black", fontWeight: "600" }}
              />
            </div>
            <div
              className="location_pass d-flex"
              style={{ border: "1px solid red", backgroundColor: " #F8F8F8" }}
            >
              <Form.Check
                type="radio"
                label="Chitrakote"
                name="formHorizontalRadios"
                id="formHorizontalRadios2"
                style={{ margin: "8px", color: "black", fontWeight: "600" }}
              />
            </div>
            </Row>
            <div style={{ marginTop: "10px" }}>
              <Row>
                <Col xs={4} md={4}>
                  <Card
                    style={{
                      width: "100%",
                      height: "100px",
                      backgroundColor: " #864BD8",
                      color: "white",
                      fontWeight:"700"
                    }}
                  >
                    <Card.Body>
                      <Card.Text
                        className="location-card"
                        style={{ marginTop: "-5px" }}
                      >
                        Car Parking
                      </Card.Text>
                      <Card.Text className="location-card">₹20</Card.Text>
                      <Card.Text className="location-card">
                        No. of Tickets
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={4} md={4}>
                  <Card
                    style={{
                      width: "100%",
                      height: "100px",
                      backgroundColor: " #864BD8",
                      color: "white",
                      fontWeight:"700"
                    }}
                  >
                    <Card.Body>
                      <Card.Text
                        className="location-card"
                        style={{ marginTop: "-5px" }}
                      >
                        Car Parking
                      </Card.Text>
                      <Card.Text className="location-card">₹20</Card.Text>
                      <Card.Text className="location-card">
                        No. of Tickets
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={4} md={4}>
                  <Card
                    style={{
                      width: "100%",
                      height: "100px",
                      backgroundColor: " #864BD8",
                      color: "white",
                      fontWeight:"700"
                    }}
                  >
                    <Card.Body>
                      <Card.Text
                        className="location-card"
                        style={{ marginTop: "-5px" }}
                      >
                        Car Parking
                      </Card.Text>
                      <Card.Text className="location-card">₹20</Card.Text>
                      <Card.Text className="location-card">
                        No. of Tickets
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>      
            <div style={{ marginTop: "10px" }}>
              <Row>
                <Col xs={4} md={4}>
                  <Card
                    style={{
                      width: "100%",
                      height: "100px",
                      backgroundColor: " #864BD8",
                      color: "white",
                      fontWeight:"700"
                    }}
                  >
                    <Card.Body>
                      <Card.Text
                        className="location-card"
                        style={{ marginTop: "-5px" }}
                      >
                        Car Parking
                      </Card.Text>
                      <Card.Text className="location-card">₹20</Card.Text>
                      <Card.Text className="location-card">
                        No. of Tickets
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={4} md={4}>
                  <Card
                    style={{
                      width: "100%",
                      height: "100px",
                      backgroundColor: " #864BD8",
                      color: "white",
                      fontWeight:"700"
                    }}
                  >
                    <Card.Body>
                      <Card.Text
                        className="location-card"
                        style={{ marginTop: "-5px" }}
                      >
                        Car Parking
                      </Card.Text>
                      <Card.Text className="location-card">₹20</Card.Text>
                      <Card.Text className="location-card">
                        No. of Tickets
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={4} md={4}>
                  <Card
                    style={{
                      width: "100%",
                      height: "100px",
                      backgroundColor: " #864BD8",
                      color: "white",
                      fontWeight:"700"
                    }}
                  >
                    <Card.Body>
                      <Card.Text
                        className="location-card"
                        style={{ marginTop: "-5px" }}
                      >
                        Car Parking
                      </Card.Text>
                      <Card.Text className="location-card">₹20</Card.Text>
                      <Card.Text className="location-card">
                        No. of Tickets
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>              
         
        </Container>  
              
      </div>

    </>
  );
}

export default Locations;
