import React, { useEffect,useState } from "react";
import { Container, Row, Col, Form, Dropdown, Button } from "react-bootstrap";
import bus1 from "../../assets/img/bus.png";
import city1 from "../../assets/img/city.png";
import Header from "../../components/Header";
import Footer from "../travesaly/Footer";
import { useHistory,useParams } from "react-router-dom";
import { API_PATH } from "../../Path/Path";
import { useDispatch, useSelector } from "react-redux";
import { createBusBooking } from "../../redux/actions";
import { FaArrowLeft } from "react-icons/fa";
import Typography from "@material-ui/core/Typography";

function CheckoutPage() {
  const history = useHistory();
  let { id } = useParams();
  const dispatch = useDispatch();
  const {
    
    data: apiData,
    tripData,
    mobile,
    routeData
  } = useSelector((state) => state.busReducer);

  console.log("object",routeData)
  const { name, age, gender, adhaar, basic_details, price } = apiData;
  console.log('basic_details',basic_details)

  const onCongratsClick = () => {
    history.push("/bookpayement");
  };
  const [packages,setPackages] = useState('')
  const [title,setTitle] = useState('')
  useEffect(() => {
    if(routeData.startDate === undefined){
      history.push('/bookingdetail')
    }
    id = localStorage.getItem("id");
     setTitle(localStorage.getItem("Package_Name"));
    getPackages()
      }, [routeData]);
  
      const getPackages = () => {
        fetch(API_PATH + `/api/v1/packages/${id}`)
          .then((response) => response.json())
          .then((res) => {
            setPackages(res.data);
          })
          .catch((e) => console.log(e));
      };

  const onClickBack = () => {
    history.push("/busconfirmation");
  };
  return (
    <>
      <div className="d-none d-md-block">
        <Header />
        <div>
          <Container className="" style={{ width: "42%", paddingTop: "50px" }}>
            <h5
              style={{
                fontSize: "19px",
                color: "#0FA453",
                fontWeight: "bolder",
                // marginLeft: "25px",
              }}
            >
              Checkout
            </h5>
              <br/>
            <Row>
              <Col xs={12} md={6}>
                <div style={{ width: "100%" }}>
                  <span
                    style={{
                      color: "black",
                      fontFamily: "sans-serif",
                      marginLeft:'27px'

                    }}
                  >
                    Package Name
                  </span>
                </div>

                <div
                  className=" select-train mt-2 d-flex align-items-center"
                  style={{ width: "100%" }}
                >
                  {title}
                  </div>
              </Col>
              <Col>
                <div style={{ width: "100%" }}>
                  <span
                    style={{
                      color: "black",
                      fontFamily: "sans-serif",
                      marginLeft:'27px'
                    }}
                  >
                    Duration
                  </span>
                </div>

                <div
                  className=" select-train mt-2 d-flex align-items-center"
                  style={{ width: "100%" }}
                >
                  {packages.duration}
                  <div className="d-flex">
                    <span
                      style={{
                        margin: "10px",
                        whiteSpace: "nowrap",
                        fontSize: "12px",
                        fontWeight: "bolder",
                        fontFamily: "sans-serif",
                      }}
                    >
                      {/* Raj Ratan Travels, Borivali East,
                    <br />
                    Devipada Subway */}

                      {tripData?.route?.end?.name}
                    </span>
                  </div>
                </div>
              </Col>
            </Row>

            <br/>
            <Row>
              <Col>
                <div style={{ marginLeft: "25px" }}>
                  <div className="p-2">
                    <span
                      style={{
                        color: "black",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      Destination
                    </span>
                    <br />
                    <span
                      style={{
                        fontSize: "19px",
                        fontWeight: "bolder",
                        color: "black",
                      }}
                    >
                      {/* Chitrakote, Bastar */}
                      {tripData?.route?.end?.name}
                    </span>
                    <br />
                    <span
                      style={{
                        color: "black",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      {/* 31 July, 2021 */}
                      {/* {tripData?.route?.end?.name} */}
                      {`${routeData?.startDate?.toLocaleDateString("en-US", { day: 'numeric' })} `}
                      {`${routeData?.startDate?.toLocaleDateString("en-US", { month: 'short' })} `}
                      {`${routeData?.startDate?.toLocaleDateString("en-US", { year: 'numeric' })} `}
                    </span>
                  </div>
                  <div className="p-2">
                    <span
                      style={{
                        color: "black",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      Total Amount
                    </span>
                    <br />
                    <span
                      style={{
                        fontSize: "19px",
                        fontWeight: "bolder",
                        color: "#FF4A68",
                      }}
                    >
                      ??? {price}
                    </span>
                    <br />
                    <span
                      style={{
                        color: "black",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      *Excluding taxes
                    </span>
                  </div>
                </div>
              </Col>
              <Col>
                <div>
                  <span
                    style={{
                      color: "black",
                      fontSize: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    Vendor Details
                  </span>
                  <div className="mt-4">
                    <div
                      className="rajratan-train p-2"
                      style={{ float: "", backgroundColor: "#F8F8F8" }}
                    >
                      <div style={{}}>
                        <span> Vendors Name:</span>
                        <span
                          style={{
                            whiteSpace: "nowrap",
                            fontSize: "13px",
                            fontWeight: "bolder",
                            fontFamily: "sans-serif",
                          }}
                        >
                          {" "} {packages?.tour_operator_account?.name}
                        </span>
                        <br/>
                        <br/>
                        <span> Vendors Email:</span>
                        <span
                          style={{
                            whiteSpace: "nowrap",
                            fontSize: "13px",
                            fontWeight: "bolder",
                            fontFamily: "sans-serif",
                          }}
                        >
                          {" "} {packages?.tour_operator_account?.email}
                        </span>
                        <br />
                        <br />
                        <span> Vendors Mobile:</span>
                        <span
                          style={{
                            whiteSpace: "nowrap",
                            fontSize: "13px",
                            fontWeight: "bolder",
                            fontFamily: "sans-serif",
                          }}
                        >
                          {" "} {packages?.tour_operator_account?.mobile}
                        </span>
                        </div>
                      </div>
                      <div className="d-flex p-1">
                      </div>
                    </div>
                  </div>
              </Col>
            </Row>
          </Container>
          <Container className="" style={{ width: "42%", paddingTop: "20px" }}>
            <Row>
              <span
                style={{
                  fontWeight: "bolder",
                  fontFamily: "sans-serif",
                  fontSize: "16px",
                  color: "black",
                  marginLeft: "25px",
                }}
              >
                Passenger Details
              </span>
              {basic_details?.length > 0 ? (
                <Row>
                  {basic_details?.map((item, i) => {
                    console.log("i",i)
                    return(
                      <Col md={6}>
                      <div
                        className="check-passenger"
                        style={{ marginLeft: "25px" }}
                      >
                        <div style={{ textAlign: "center", padding: "10px" }}>
                          <span
                            style={{
                              fontWeight: "bolder",
                              fontFamily: "sans-serif",
                              fontSize: "13px",
                              color: "black",
                            }}
                          >
                            {item['name'+i]}
                          </span>
                          <br />
                          <span>
                            {item.gender}, {item['age'+i]}
                          </span>
                          <br />
                          <span> Adhaar: {item['adhaar'+i]}</span>
                          <div className="p-3">
                            <Button className="checout-btn" onClick={onClickBack} >EDIT</Button>
                          </div>
                        </div>
                      </div>
                    </Col>
                    )
                    
                  })}
                </Row>
              ) : null}
            </Row>
            <div style={{margin:"10% 35%"}}>
              <Button className="locationpass-btn " onClick={onCongratsClick}>
                NEXT
              </Button>
            </div>
          </Container>
        </div>
        {/* <div style={{ height: "250px" }}></div> */}
        {/* <div
          className="check-payment"
          style={{ background: "#0FA453" }}
          onClick={onCongratsClick}
        >
          <div
            className="checkout-payment"
            style={{
              position: "absolute",
              lineHeight: "25px",
              fontSize: "21px",
              textAlign: "center",
              paddingTop: " 32px",
              fontWeight: "bolder",
              color: " #FFFFFF",
            }}
          >
            NEXT
          </div>
        </div> */}


        <Footer />
      </div>


      {/*Mobile_view*/}
      <div fluid className="d-md-none">
        <div
          className="tatibandh d-flex"
          style={{
            height: "85px",
            backgroundColor: "#0FA453",
            color: "white",
          }}
        >
          <div
            style={{
              // marginRight: "62px",
              paddingTop: " 20px",
              fontSize: " 24px",
              marginLeft: "20px",
            }}
          >
            <FaArrowLeft onClick={onClickBack} />
          </div>
          <div>
            <h5
              style={{
                marginLeft: "110px",
                paddingTop: "29px",
                fontSize: "17px",
                backgroundColor: "#0FA453",
                fontWeight: "bolder",
                color: "white",
                textAlign: "center",
              }}
            >
              Checkout
            </h5>
          </div>
        </div>
        <Row>
              <Col xs={6}>
                <div style={{ width: "89%" }}>
                  <span
                    style={{
                      color: "black",
                      fontFamily: "sans-serif",
                      marginLeft:'27px'
                    }}
                  >
                    Boarding from
                  </span>

                </div>
                <div className=" select-train mt-2 d-flex">
                  <Form className="d-flex">
                    {["radio"].map((type) => (
                      <div
                        key={`inline-${type}`}
                        className="mb-3"
                        style={{ margin: "10px", marginLeft: "10px" }}
                      >
                        {/* <Form.Check
                        inline
                        label=""
                        name="group1"
                        type={type}
                        id={`inline-${type}-1`}
                      /> */}
                      </div>
                    ))}

                    {/* <span
                      style={{
                        marginTop: "10px",
                        marginRight: "10px",
                        color: "black",
                        fontWeight: "bolder",
                        fontFamily: "sans-serif",
                      }}
                    >
                      {tripData?.departure_time}
                    </span> */}
                  </Form>
                  <div className="d-flex">
                    <span
                      style={{
                        margin: "10px",
                        whiteSpace: "nowrap",
                        fontSize: "12px",
                        fontWeight: "bolder",
                        fontFamily: "sans-serif",
                        textAlign:"justify"
                      }}
                    >
                      {tripData?.route?.start?.name}
                    </span>
                  </div>
                </div>
              </Col>
              <Col xs={6}>
                <div style={{ width: "89%" }}>
                  <span
                    style={{
                      color: "black",
                      fontFamily: "sans-serif",
                      marginLeft:'27px'
                    }}
                  >
                    Dropoff At
                  </span>

                </div>
                <div className=" select-train mt-2 d-flex">
                  <Form className="d-flex">
                    {["radio"].map((type) => (
                      <div
                        key={`inline-${type}`}
                        className="mb-3"
                        style={{ margin: "10px", marginLeft: "10px" }}
                      >
                        {/* <Form.Check
                        inline
                        label=""
                        name="group1"
                        type={type}
                        id={`inline-${type}-1`}
                      /> */}
                      </div>
                    ))}

                    {/* <span
                      style={{
                        // marginTop: "10px",
                        // marginRight: "0px",
                        // color: "black",
                        // fontWeight: "bolder",
                        // fontFamily: "sans-serif",
                      }}
                    >
                      {tripData?.estimated_time_of_arrival}
                    </span> */}
                  </Form>
                  <div className="d-flex">
                    <span
                      style={{
                        margin: "10px",
                        whiteSpace: "nowrap",
                        fontSize: "12px",
                        fontWeight: "bolder",
                        fontFamily: "sans-serif",
                      }}
                    >

                      {tripData?.route?.end?.name}
                    </span>
                  </div>
                </div>
              </Col>
            </Row>

        
        <Container>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <span>Destination</span>
            <h3 style={{ fontWeight: "700" }}>
              {/* Chitrakote, Bastar */}
              {tripData?.route?.end?.name}</h3>
            <span>
              {/* 31 July, 2021 */}
              {`${routeData?.startDate?.toLocaleDateString("en-US", { day: 'numeric' })} `}
              {`${routeData?.startDate?.toLocaleDateString("en-US", { month: 'short' })} `}
              {`${routeData?.startDate?.toLocaleDateString("en-US", { year: 'numeric' })} `}
            </span>
            <br />
            <span>Total Amount</span> <br />
            <span style={{ fontWeight: "700", fontSize: "22px", color: "#FF4A68" }}>  ??? {price} </span> <br />
            <span>*Excluding taxes</span>
          </div>
        </Container>

        <Container className="" style={{ width: "", paddingTop: "20px" }}>
          <Row>
            <span
              style={{
                fontWeight: "bolder",
                fontFamily: "sans-serif",
                fontSize: "13px",
                color: "black",
                // marginLeft: "10px",
                whiteSpace: 'nowrap',
                textAlign: ""
              }}
            >
              Passenger Details
            </span>
            {basic_details?.length > 0 ? (
              <Row>
                {/* <h3
                    style={{
                      fontSize: "19px",
                      color: "#0FA453",
                      fontWeight: "bolder",
                    }}>Passengers ({`${basic_details?.length}`})</h3> */}
                {basic_details?.map((item, i) => (
                  <Col xs={6} md={6}>
                    <div
                      className="check-passenger"
                      style={{ marginLeft: "25px" }}
                    >
                      <div style={{ textAlign: "center", padding: "5px", marginTop: "10px" }}>
                        <span
                          style={{
                            fontWeight: "bolder",
                            fontFamily: "sans-serif",
                            fontSize: "13px",
                            color: "black",
                          }}
                        >
                          {item['name'+i]}
                        </span>
                        <br />
                        <span style={{
                          fontWeight: "bold",
                          fontFamily: "sans-serif",
                          fontSize: "11px",
                          color: "black",
                        }}>
                          {item.gender}, {item['age'+i]}
                        </span>
                        <br />
                        <span style={{
                          fontWeight: "bold",
                          fontFamily: "sans-serif",
                          fontSize: "11px",
                          color: "black",
                        }}> Adhaar: {item['adhaar'+i]}</span>
                        <div className="">
                          <Button className="checout-btn" onClick={onClickBack} >EDIT</Button>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            ) : null}
          </Row>
        </Container>
        {/* <div
          className="check-payment"
          style={{ 
            background: "#0FA453",
            marginTop: "0px",
            position: "absolute",
            bottom: 0
          }}
          onClick={onCongratsClick}
        >
          <div
            className="checkout-payment"
            style={{
              position: "absolute",
              lineHeight: "25px",
              fontSize: "21px",
              textAlign: "center",
              paddingTop: " 32px",
              fontWeight: "bolder",
              color: " #FFFFFF",
            }}
          >
            NEXT
          </div>
        </div> */}

        <Button className="locationpass-btn  mt-5" onClick={onCongratsClick}>
          NEXT
        </Button>
      </div>
    </>
  );
}

export default CheckoutPage;
