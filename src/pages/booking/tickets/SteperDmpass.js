import React, { useEffect, useState } from "react";
import { Container, Row, Button, Form, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import ButtonComponent from "../../../containers/Button";
import { Stepper } from "react-form-stepper";
import DatePicker from "react-datepicker";
import calendar from "../../../assets/img/calendar.png";
import Cards from "../../dm pass/Cards";
import Header from "../../../components/Header";
import congo from "../../../assets/img/mobile.png";
import { FaWhatsapp } from "react-icons/fa";
import Footer from "../../travesaly/Footer";
import { useDispatch, useSelector } from "react-redux";
// import { Formik, Field } from "formik";
import { ToastContainer } from "react-toastify";
// import * as yup from "yup";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
} from "@material-ui/core";
import { createDmPass, setDmData } from "../../../redux/actions";
import { API_PATH } from "../../../Path/Path";
import axios from "axios";
import { AvForm, AvField } from "availity-reactstrap-validation";

// const schema = yup.object().shape({
//   name: yup.string().required(),
//   email: yup.string().required(),
//   number: yup.string().required(),
// });
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

function SteperDmpass(shows, ...props) {
  const [show, setShow] = useState(0);
  const [paymentCustom, setPaymentCustom] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  // const [activeButton, setActiveButton] = useState(button_Data[0].name);
  // const [data, setData] = useState();
  const history = useHistory();

  const dispatch = useDispatch();
  const { dmData } = useSelector((state) => state.dmpassReducer);
  const { user_data } = useSelector((state) => state.loginReducer);
  const { dmpass_id, start_date } = dmData;
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <button
      style={{
        border: "none",
        background: "transparent",
        fontSize: "20px",
        color: "#a5a5a5",
        marginTop: -10,
      }}
      onClick={onClick}
      ref={ref}
    >
      {value}
    </button>
  ));

  useEffect(() => {
    let mob;
    if (user_data !== null) {
      // mob = user_data?.user?.mobile?.slice(2, user_data?.user?.mobile?.length);
      mob = user_data?.user?.mobile;
      dispatch(setDmData("mobile", mob));
      getDmPassData(mob);
      console.log();
    }
  }, [user_data]);

  const getDmPassData = async (mobile) => {
    await axios
      .post(`${API_PATH}/api/v1/dmpass/search`, {
        mobile,
      })
      .then((response) => {
        return response.data;
      })
      .then((json) => {
        console.log("js", json);
        return json;
      })
      .catch((error) => {
        console.log("js", error);
      });
  };

  const onDmPassClick = () => {
    console.log("objectNEwwwwwwwww", {
      ...dmData,
      basic_details: travellers,
      vehical_details: vehicles,
    });
    setShow(1);
  };
  const onTicketCheckClick = () => {
    axios
      .post(`${API_PATH}/api/v1/entrypass/pay`, {
        amount: tot_charges,
      })
      .then((result) => {
        setData(result.data);
        setPaymentCustom(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const onClickBack = () => {
    history.push("./tickets");
  };

  const initialTravellers = () => {
    let temp = [];
    for (let v = 0; v < 1; v++) {
      temp.push({
        name: "",
        gender: "Male",
        age: "",
        adhaar: "",
        customer_id: JSON.parse(localStorage.getItem("customer_id")),
      });
    }
    return temp;
  };
  const [travellers, setTravellers] = useState(initialTravellers);
  const [showDate, setShowDate] = useState("");

  const handleTraveller = (val, lbl, i) => {
    console.log("val", val);
    setTravellers(
      [...travellers].map((obj, key) => {
        if (key === i) {
          return {
            ...obj,
            [lbl]: val,
          };
        } else {
          return obj;
        }
      })
    );
  };

  const initialVehicles = () => {
    let temp = [];
    for (let v = 0; v < 1; v++) {
      temp.push({
        vehicle_number: "",
        name: "",
        gender: "Male",
        age: "",
        adhaar: "",
      });
    }
    return temp;
  };

  const [vehicles, setVehicles] = useState(initialVehicles);
  const handleVehicle = (val, lbl, i) => {
    setVehicles(
      [...vehicles].map((obj, key) => {
        if (key === i) {
          return {
            ...obj,
            [lbl]: val,
          };
        } else {
          return obj;
        }
      })
    );
  };

  const [tot_charges, setTot_charges] = useState(0);
  const [locServ, setLocServ] = useState([
    {
      locations: [
        {
          location: "",
          location_name: "",
          services: [
            {
              service_id: "",
              service_name: "",
              charge: "",
              total_charges: "",
              unit: "",
            },
          ],
        },
      ],
    },
  ]);

  useEffect(() => {
    getLocationsList();
    let st_date = new Date(start_date);
    if (start_date === "") {
      st_date = new Date();
      dispatch(setDmData("start_date", getFormatedDate(st_date)));
    }
    showFormatedDate(st_date);
    let en_date = new Date();
    en_date.setDate(st_date.getDate() + Number(1));
    dispatch(setDmData("duration_of_travel", 1));
    dispatch(setDmData("end_date", getFormatedDate(en_date)));
  }, []);

  const getLocationsList = async () => {
    let temp = [];
    await fetch(`${API_PATH}/api/v1/location/list?ischecked=true`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        // console.log(json);
        // setLocationList(json.data)
        json?.data?.map(async (item, i) => {
          let tempServ = [];
          fetch(`${API_PATH}/api/v1/services/list?location=${item?._id}`)
            .then((response) => {
              return response.json();
            })
            .then((res) => {
              res?.data?.map((service, i) => {
                // console.log("service", service);
                tempServ.push({
                  service_id: service._id,
                  service_name: service.service_name,
                  charge: service.price,
                  total_charges: "0",
                  unit: "0",
                });
              });
            });
          temp.push({
            location: item?._id,
            location_name: item?.name,
            services: tempServ,
          });
        });
      });

    console.log("temp", temp);
    setLocServ(temp);
  };

  useEffect(() => {
    console.log("locServ", locServ);
  }, [locServ]);

  const handleService = (val, lbl, i, j) => {
    console.log("handleService", { val, lbl, i, j });
    setLocServ(
      [...locServ].map((obj, key) => {
        if (key === i) {
          return {
            ...obj,
            services: obj.services.map((service, key2) => {
              if (key2 === j) {
                console.log("acc11", service);
                if (lbl === "-" && val != 0) {
                  setTot_charges(
                    tot_charges +
                      Number(service?.charge * (val - 1)) -
                      service?.total_charges
                  );
                  return {
                    ...service,
                    unit: val - 1,
                    total_charges: Number(service?.charge * (val - 1)),
                  };
                } else if (lbl === "+") {
                  setTot_charges(
                    tot_charges +
                      Number(service?.charge * (Number(val) + 1)) -
                      service?.total_charges
                  );
                  return {
                    ...service,
                    unit: Number(val) + 1,
                    total_charges: Number(service?.charge * (Number(val) + 1)),
                  };
                } else {
                  return service;
                }
              } else {
                return service;
              }
            }),
          };
        } else {
          return obj;
        }
      })
    );
  };
  const handleDuration = (e) => {
    console.log(e.target.value);
    let st_date = new Date(start_date);
    if (start_date === "") {
      st_date = new Date();
      dispatch(setDmData("start_date", getFormatedDate(st_date)));
    }
    let en_date = new Date();
    en_date.setDate(st_date.getDate() + Number(e.target.value));
    dispatch(setDmData("duration_of_travel", e.target.value));
    dispatch(setDmData("end_date", getFormatedDate(en_date)));
  };
  const getFormatedDate = (d) => {
    let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
    let mo = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(d);
    let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
    return `${ye}-${mo}-${da}`;
  };

  const showFormatedDate = (d) => {
    let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
    let mo = new Intl.DateTimeFormat("en", { month: "long" }).format(d);
    let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
    setShowDate(`${da}, ${mo} ${ye}`);
  };

  const handleTravellerCount = (e) => {
    console.log("travller seleted", e.target.value);
    console.log("object", travellers);
    const count = e.target.value;

    if (e.target.value == 1) {
      setTravellers([travellers]);
    } else if (e.target.value == 2) {
      setTravellers([travellers, travellers]);
    } else if (e.target.value == 3) {
      setTravellers([travellers, travellers, travellers]);
    } else if (e.target.value == 4) {
      setTravellers([travellers, travellers, travellers, travellers]);
    } else if (e.target.value == 5) {
      setTravellers([
        travellers,
        travellers,
        travellers,
        travellers,
        travellers,
      ]);
    } else if (e.target.value == 6) {
      setTravellers([
        travellers,
        travellers,
        travellers,
        travellers,
        travellers,
        travellers,
      ]);
    }
  };
  const handlerVehicles = (e) => {
    console.log("Number of Vehicles", e.target.value);
    if (e.target.value == 1) {
      setVehicles([vehicles]);
    } else if (e.target.value == 2) {
      setVehicles([vehicles, vehicles]);
    } else if (e.target.value == 3) {
      setVehicles([vehicles, vehicles, vehicles]);
    } else if (e.target.value == 4) {
      setVehicles([vehicles, vehicles, vehicles, vehicles]);
    } else if (e.target.value == 5) {
      setVehicles([vehicles, vehicles, vehicles, vehicles, vehicles]);
    } else if (e.target.value == 6) {
      setVehicles([vehicles, vehicles, vehicles, vehicles, vehicles, vehicles]);
    }
  };
  const [data, setData] = useState();

  const onLocationsClick = () => {
    console.log("object", tot_charges);
    if (tot_charges > 0) {
      setShow(2);
    }
    return shows;
  };

  async function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const displayRazorpaysss = async (values) => {
    console.log("objec::::::::::::::::::::::t", values.email);
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    console.log("data", data.amount);
    var options = {
      key: "rzp_live_I8E16v75z35cbj", //rzp_test_DuapYrmQwcWLGy
      currency: "INR",
      amount: data.amount.toString(),
      order_id: data.id,
      name: "Aamcho Bastar",
      description: "Thank You For Booking.",
      image: "https://travelbastar.com/static/media/logo.0a3bc983.png",
      handler: function (response) {
        if (response.razorpay_payment_id) {
          dispatch(
            createDmPass({
              ...dmData,
              basic_details: travellers,
              vehical_details: vehicles,
              name: name,
              email: email,
              whatsapp: number,
              locations: locServ,
              total_charges: tot_charges,
            })
          );
          dispatch(
            setDmData({ ...dmData, order_id: response.razorpay_order_id })
          );
          localStorage.setItem("dm_pass_id", dmData.dmpass_id);
          setShow(3);
        }
      },
      prefill: {
        name: name,
        email: email,
        contact: number,
      },
    };
    const paymentOpject = new window.Razorpay(options);
    paymentOpject.open();
  };
  const onInvalidSubmit = (e) => {
    console.log("Invalid", e);
  };

  return (
    <>
      <div className="d-none d-md-block">
        <Header />
      </div>
      <div className="dmpass-div d-md-none">
        <Container className="dm-kangervilla">
          <FaArrowLeft className="kanger-arrow" onClick={onClickBack} />
          <div className="kangervilla">
            <span className="kanger-valley">
              Tickets
              <br />
              {/* 30th July, 2021 */}
              {showDate}
            </span>
          </div>
        </Container>
      </div>

      <Container>
        <Stepper
          steps={[
            { label: <b>Travel Pass</b> },
            { label: <b>Locations</b> },
            { label: <b>Confirm Payment</b> },
            { label: <b>View Ticket</b> },
          ]}
          activeStep={show}
          className="pb-0"
        />
      </Container>

      {show == 0 ? (
        <div>
          <Container className="dmpass-form mt-4">
            <AvForm
              onValidSubmit={onDmPassClick}
              onInvalidSubmit={onInvalidSubmit}
            >
              {/* <AvForm onSubmit={onDmPassClick}> */}
              <Row className="dmpassData">
                <h3
                  style={{
                    fontWeight: "bolder",
                    fontSize: "20px",
                    textAlign: "center",
                  }}
                >
                  Book your Travel Pass
                </h3>
                {/* <form onSubmit={(e) => e.preventDefault()}> */}
                <div className="form-row"></div>

                <div className="form-row">
                  <div className="form-group mt-4 ">
                    <label for="inputState">Number of Travellers</label>
                    <select
                      id="inputState"
                      className="form-control pass_input"
                      onChange={handleTravellerCount}
                    >
                      <option value="1" selected>
                        1
                      </option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                    </select>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: 10,
                    }}
                  >
                    <Form.Group
                      controlId="exampleForm.ControlInput1"
                      style={{ marginRight: "20px", width: "100%" }}
                    >
                      <Form.Label
                        className="formselect"
                        style={{
                          fontSize: "12px",
                          fontWeight: "bolder",
                          marginLeft: "4px",
                          color: "black",
                        }}
                      >
                        Start Date
                      </Form.Label>
                      <div
                        className="location-userdatas"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          overflow: "hidden",
                          borderRadius: 5,
                        }}
                      >
                        <img
                          className="location-userdatas-calendar"
                          src={calendar}
                          style={{ width: 25, height: 25 }}
                        />
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          customInput={<ExampleCustomInput />}
                          dateFormat="dd MMM"
                        />
                      </div>
                    </Form.Group>

                    <Form.Group
                      controlId="exampleForm.ControlInput1"
                      style={{ width: "100%" }}
                    >
                      <Form.Label
                        className="formselect"
                        style={{
                          fontSize: "12px",
                          fontWeight: "bolder",
                          marginLeft: "4px",
                          color: "black",
                        }}
                      >
                        End Date
                      </Form.Label>
                      <div
                        className="location-userdatas"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          overflow: "hidden",
                          borderRadius: 5,
                        }}
                      >
                        <img
                          className="location-userdatas-calendar"
                          src={calendar}
                          style={{ width: 25, height: 25 }}
                        />
                        <DatePicker
                          selected={endDate}
                          onChange={(date) => setEndDate(date)}
                          customInput={<ExampleCustomInput />}
                          dateFormat="dd MMM"
                        />
                      </div>
                    </Form.Group>
                  </div>

                  <div className="form-group mt-0 ">
                    <label for="inputState">Number of Vehicles</label>
                    <select
                      id="inputState"
                      className="form-control pass_input"
                      onChange={handlerVehicles}
                    >
                      <option value="1" selected>
                        1
                      </option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                    </select>
                  </div>
                </div>
                <Container className="p-0 pb-5">
                  <Row>
                    <Col className="pt-3">
                      {/* <div style={{ width: "50%", float: "right" }}> */}
                      <label
                        style={{
                          fontSize: "14px",
                          // marginBottom: "10px",
                          fontWeight: "500",
                          color: "black",
                        }}
                      >
                        Vehicle Details
                      </label>

                      <div
                        className="traveller_div"
                        style={{
                          marginTop: "1rem",
                          justifyContent: "flex-start",
                        }}
                      >
                        {vehicles.map((item, i) => (
                          <Paper
                            key={i}
                            className="traveller__card p-4 flex-grow-1"
                            style={{ width: 200 }}
                          >
                            <div
                              className="traveller__card_body"
                              className="py-0"
                            >
                              <h5
                                className="traveller__card_title"
                                style={{ fontSize: "12px" }}
                              >
                                Vehicle {i + 1}
                              </h5>
                              <p className="traveller__card_text">
                                <div className="form-group pt-4">
                                  <label
                                    className="mb-1"
                                    for={`vehicle_number${i}`}
                                  >
                                    Vehicle Number
                                  </label>
                                  <AvField
                                    type="text"
                                    className="form-control pass_input"
                                    id={`vehicle_number${i}`}
                                    placeholder="Enter the license plate number"
                                    style={{
                                      fontSize: "11px",
                                      marginLeft: "-5px",
                                    }}
                                    name="registration_number"
                                    onChange={(e) =>
                                      handleVehicle(
                                        e.target.value,
                                        e.target.name,
                                        i
                                      )
                                    }
                                    value={vehicles[i].registration_number}
                                    validate={{
                                      required: {
                                        value: true,
                                        errorMessage:
                                          "Enter the license plate number",
                                      },
                                    }}
                                  />
                                </div>
                                <div className="form-group pt-4">
                                  <label className="mb-1" for={`name${i}`}>
                                    Driver Name
                                  </label>
                                  <AvField
                                    type="text"
                                    className="form-control pass_input"
                                    id={`name${i}`}
                                    placeholder="Enter Driver Name"
                                    style={{
                                      fontSize: "11px",
                                      marginLeft: "-5px",
                                    }}
                                    name="driver_name"
                                    onChange={(e) =>
                                      handleVehicle(
                                        e.target.value,
                                        e.target.name,
                                        i
                                      )
                                    }
                                    value={vehicles[i].driver_name}
                                    validate={{
                                      required: {
                                        value: true,
                                        errorMessage: "Enter Driver Name",
                                      },
                                    }}
                                  />
                                </div>

                                <div className="form-group mt-1 pt-4">
                                  <label className="mb-1" for={`aadhaar${i}`}>
                                    Driver License Number
                                  </label>
                                  <AvField
                                    type="text"
                                    className="form-control pass_input"
                                    id={`adhaar${i}`}
                                    placeholder="Driver License Number"
                                    style={{
                                      fontSize: "11px",
                                      marginLeft: "-5px",
                                    }}
                                    // name="adhaar" onChange={handleChange} value={adhaar}
                                    name="driver_license_number"
                                    onChange={(e) =>
                                      handleVehicle(
                                        e.target.value,
                                        e.target.name,
                                        i
                                      )
                                    }
                                    value={vehicles[i].adhaar}
                                    validate={{
                                      required: {
                                        value: true,
                                        errorMessage: "Driver License Number",
                                      },
                                    }}
                                  />
                                </div>
                              </p>
                            </div>
                          </Paper>
                        ))}
                      </div>
                    </Col>
                    <Col className="pt-3 pb-5">
                      {/* <div style={{ width: "50%" }}> */}
                      <label
                        style={{
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "black",
                        }}
                      >
                        Travellers Details
                      </label>

                      <div
                        className="traveller_div"
                        style={{
                          marginTop: "1rem",
                          justifyContent: "flex-start",
                        }}
                      >
                        {travellers?.map((item, i) => (
                          <Paper
                            key={i}
                            className="traveller__card p-4 flex-grow-1"
                            style={{ minHeight: "364px" }}
                          >
                            <div
                              className="traveller__card_body"
                              className="py-0"
                            >
                              <h5
                                className="traveller__card_title"
                                style={{ fontSize: "12px" }}
                              >
                                Travellers {i + 1}
                              </h5>
                              <p className="traveller__card_text">
                                <div className="form-group pt-4">
                                  <label className="mb-3" for={`name${i}`}>
                                    Name
                                  </label>
                                  <AvField
                                    type="text"
                                    className="form-control pass_input"
                                    id={`name${i}`}
                                    placeholder="Enter Traveller Name"
                                    style={{
                                      fontSize: "11px",
                                      marginLeft: "-5px",
                                    }}
                                    name="name"
                                    onChange={(e) =>
                                      handleTraveller(
                                        e.target.value,
                                        e.target.name,
                                        i
                                      )
                                    }
                                    value={travellers[i].name}
                                    validate={{
                                      required: {
                                        value: true,
                                        errorMessage: "Enter Traveller Name",
                                      },
                                    }}
                                  />
                                </div>

                                <div className="form-row genderform pt-3 d-flex ">
                                  <div className="col m-2 w-50">
                                    <label className="mb-3" for={`gender${i}`}>
                                      Gender
                                    </label>
                                    <div className="d-flex pt-2">
                                      <ButtonComponent
                                        style={{
                                          width: "50%",
                                          fontSize: "11px",
                                          whiteSpace: "nowrap",
                                        }}
                                        type="button"
                                        data={button_Data}
                                        // activeButton={activeButton}
                                        // trigerOnClickEmpSideBtn={onSideBtnClick}
                                        trigerOnClickEmpSideBtn={(e) =>
                                          handleTraveller(
                                            e.target.name,
                                            "gender",
                                            i
                                          )
                                        }
                                        activeButton={travellers[i].gender}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-group col m-2 w-50">
                                    <label className="mb-3" for={`age${i}`}>
                                      Age
                                    </label>
                                    <AvField
                                      type="text"
                                      className="form-control pass_input w-70 pt-2"
                                      placeholder="Enter Age"
                                      id={`age${i}`}
                                      style={{
                                        width: "110px",
                                        marginLeft: "-5px",
                                        fontSize: "12px",
                                        whiteSpace: "nowrap",
                                        height: "33px",
                                      }}
                                      name="age"
                                      onChange={(e) =>
                                        handleTraveller(
                                          e.target.value,
                                          e.target.name,
                                          i
                                        )
                                      }
                                      value={travellers[i].age}
                                      validate={{
                                        required: {
                                          value: true,
                                          errorMessage: "Enter Age",
                                        },
                                      }}
                                    />
                                  </div>
                                </div>

                                <div className="form-group mt-1 pt-3">
                                  <label className="mb-3" for={`aadhaar${i}`}>
                                    Adhaar Card Number{" "}
                                  </label>
                                  <AvField
                                    type="text"
                                    className="form-control pass_input"
                                    id={`adhaar${i}`}
                                    placeholder="Enter 12 digit Adhaar Card Number"
                                    style={{
                                      fontSize: "11px",
                                      marginLeft: "-5px",
                                    }}
                                    name="adhaar"
                                    onChange={(e) =>
                                      handleTraveller(
                                        e.target.value,
                                        e.target.name,
                                        i
                                      )
                                    }
                                    value={travellers[i].adhaar}
                                    validate={{
                                      required: {
                                        value: true,
                                        errorMessage:
                                          "Enter 12 digit Adhaar Card Number",
                                      },
                                    }}
                                  />
                                </div>
                              </p>
                            </div>
                          </Paper>
                        ))}
                      </div>
                    </Col>
                  </Row>
                </Container>
              </Row>

              <div className="d-none d-md-block">
                <div style={{ textAlign: "center" }}>
                  <Button
                    type="submit"
                    style={{
                      marginTop: "50px",
                      width: "200px",
                      height: "50px",
                      backgroundColor: "#0fa453",
                      color: "white",
                      fontWeight: "900",
                      fontSize: "15px",
                      marginBottom: "50px",
                      border: "1px solid #0fa453",
                    }}
                  >
                    Save & Continue
                  </Button>
                </div>
              </div>

              <div className="d-md-none">
                <Button
                  type="submit"
                  style={{
                    marginTop: "50px",
                    width: "100%",
                    height: "71px",
                    border: "1px solid #0fa453",
                    color: "white",
                    fontWeight: "900",
                    fontSize: "15px",
                    backgroundColor: "#0fa453",
                    borderRadius: 0,
                  }}
                >
                  Save & Continue
                </Button>
              </div>
            </AvForm>
            <ToastContainer />
          </Container>

          <div className="d-none d-md-block">
            <Footer />
          </div>
        </div>
      ) : show == 1 ? (
        <div>
          <Container className="dmpass-form mt-2">
            <Row
              className="dmpassData d-none d-md-block"
              style={{ backgroundColor: "#FF814A" }}
            >
              <h6
                style={{
                  textAlign: "center",
                  color: "white",
                  paddingTop: "10px",
                }}
              >
                Tickets
              </h6>
              <h6
                style={{
                  textAlign: "center",
                  color: "white",
                  paddingBottom: "10px",
                }}
              >
                {showDate}
              </h6>
            </Row>
            <Row className="dmpassData">
              <h3
                style={{
                  fontWeight: "bolder",
                  fontSize: "20px",
                  textAlign: "center",
                }}
              >
                Select Locations
              </h3>
              {locServ.length > 0
                ? locServ?.map((item, key) => (
                    <Accordion
                      className="p-0"
                      style={{ boxShadow: "none" }}
                      expanded={expanded === "panel" + key}
                      onChange={handleChange("panel" + key)}
                    >
                      <AccordionSummary
                        className="p-0"
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <div
                          className="location_pass w-100 d-flex"
                          style={{
                            border: "1px solid #888",
                            backgroundColor: " #F8F8F8",
                            borderRadius: 5,
                          }}
                        >
                          <Form.Check
                            type="radio"
                            // label={item?.location_name}
                            name="formHorizontalRadios"
                            id={"formHorizontalRadios" + key}
                            checked={expanded === "panel" + key ? 1 : 0}
                            style={{
                              margin: "8px",
                              color: "black",
                              fontWeight: "600",
                            }}
                          />
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              fontWeight: "bold",
                            }}
                          >
                            {item?.location_name}
                          </span>
                        </div>
                      </AccordionSummary>
                      <AccordionDetails className="py-0">
                        <div className="card-Caintainer">
                          {item?.services?.length > 0
                            ? item?.services?.map((service, j) => (
                                <Cards
                                  key={j}
                                  parname={service?.service_name}
                                  rate={service?.charge}
                                  value={service?.unit}
                                  i={key}
                                  j={j}
                                  onClick={handleService}
                                />
                              ))
                            : null}
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  ))
                : null}
            </Row>
          </Container>
          <div className=" d-none d-md-block">
            <div className="locatione-title">
              <Col md={6}>
                <div className="location-amount">
                  <span className="location-total">Total Amount</span>
                  <span className="location-rs">??? {tot_charges}</span>
                </div>
              </Col>
              <Col md={6}>
                <Button
                  style={{
                    width: "100%",
                    marginLeft: "0px",
                    borderRadius: "0px",
                    height: "100%",
                  }}
                  className="locationpass-btn"
                  onClick={onLocationsClick}
                >
                  Save & Continue
                </Button>
              </Col>
            </div>
          </div>
          <div>
            <div
              className="d-md-none"
              style={{ position: "fixed", width: "100%", bottom: "0" }}
            >
              <Col xs={12} md={6}>
                <div className="location-amount">
                  <span className="location-total">Total Amount</span>
                  <span className="location-rs">??? {tot_charges}</span>
                </div>
              </Col>
              <Col xs={12} md={6}>
                <Button
                  className="locationpass-btn fw-bold"
                  onClick={onLocationsClick}
                >
                  Save & Continue
                </Button>
              </Col>
            </div>
          </div>
          <div className="d-none d-md-block">
            <Footer />
          </div>
        </div>
      ) : show == 2 ? (
        <>
          {!paymentCustom ? (
            <>
              <div>
                <div>
                  <Container className="dmpass-form mt-2">
                    <Row
                      className="dmpassData d-none d-md-block"
                      style={{ backgroundColor: "#FF814A" }}
                    >
                      <h6
                        style={{
                          textAlign: "center",
                          color: "white",
                          paddingTop: "10px",
                        }}
                      >
                        Tickets
                      </h6>
                      <h6
                        style={{
                          textAlign: "center",
                          color: "white",
                          paddingBottom: "10px",
                        }}
                      >
                        {showDate}
                      </h6>
                    </Row>
                    <h3 style={{ textAlign: "center" }}>
                      Confirm your Details
                    </h3>
                    <div className="confirm-main">
                      <div
                        className="confirm_div"
                        style={{
                          textAlign: "center",
                          backgroundColor: "#F8F8F8",
                          marginBottom: "10px",
                          padding: "20px",
                        }}
                      >
                        {locServ.length > 0
                          ? locServ?.map((item, key) => (
                              <>
                                <Row className="mb-1">
                                  <Col
                                    xs={6}
                                    md={6}
                                    style={{ textAlign: "left" }}
                                  >
                                    <span className="confirm-title">
                                      {item?.location_name}
                                    </span>
                                  </Col>
                                  <Col
                                    style={{ textAlign: "right" }}
                                    xs={6}
                                    md={6}
                                  >
                                    <span
                                      style={{
                                        color: "#FF4A68",
                                        fontSize: "15px",
                                        fontWeight: "600",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => setShow(1)}
                                    >
                                      Change
                                    </span>
                                  </Col>
                                  <Col>
                                    {item?.services?.length > 0
                                      ? item?.services?.map((service, j) => (
                                          <Row>
                                            <Col
                                              xs={6}
                                              md={6}
                                              style={{ textAlign: "left" }}
                                            >
                                              <span className="confirm_part">
                                                {service?.service_name} x{" "}
                                                {service?.unit}
                                              </span>
                                            </Col>
                                            <Col
                                              xs={6}
                                              md={6}
                                              style={{ textAlign: "right" }}
                                            >
                                              <span className="confirm_part">
                                                {service?.total_charges}{" "}
                                              </span>
                                            </Col>
                                          </Row>
                                        ))
                                      : null}
                                  </Col>
                                </Row>
                              </>
                            ))
                          : null}

                        <div>
                          <div className="location-amount">
                            <span className="location-total">Total Amount</span>
                            <span className="location-rs">??? {tot_charges}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Container>
                </div>

                <div className="d-none d-md-block">
                  <div style={{ textAlign: "center" }}>
                    <Button
                      onClick={onTicketCheckClick}
                      type="submit"
                      style={{
                        marginTop: "50px",
                        width: "200px",
                        height: "50px",
                        backgroundColor: "#0fa453",
                        color: "white",
                        fontWeight: "900",
                        fontSize: "15px",
                        marginBottom: "50px",
                        border: "1px solid #0fa453",
                      }}
                    >
                      Save & Continue
                    </Button>
                  </div>
                </div>
                <div className="d-md-none">
                  <Button
                    onClick={onTicketCheckClick}
                    type="submit"
                    style={{
                      marginTop: "50px",
                      width: "100%",
                      height: "71px",
                      border: "1px solid #0fa453",
                      color: "white",
                      fontWeight: "900",
                      fontSize: "15px",
                      backgroundColor: "#0fa453",
                      borderRadius: 0,
                      // position: "absolute",
                      // bottom: 0
                    }}
                  >
                    Save & Continue
                  </Button>
                </div>
              </div>

              <div className="d-none d-md-block">
                <Footer />
              </div>
            </>
          ) : (
            <>
              <ToastContainer />
              <div className="">
                <Container style={{ width: "75%", marginTop: "50px" }}>
                  <div>
                    <AvForm>
                      <Row style={{ justifyContent: "center" }}>
                        <Col xs={12} md={6} className="mt-2">
                          <Form.Label className="dm-ticket">
                            Enter Your Name
                          </Form.Label>
                          <AvField
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            name="name"
                            type="text"
                            className="position-relative"
                            placeholder="Enter Name"
                            validate={{
                              required: {
                                value: true,
                                errorMessage: "Enter Your Name",
                              },
                            }}
                          />

                          <Form.Label className="dm-ticket">
                            Enter WhatsApp Number
                          </Form.Label>

                          <AvField
                            onChange={(e) => setNumber(e.target.value)}
                            value={number}
                            name="number"
                            type="number"
                            className="position-relative"
                            errorMessage="Invalid Number"
                            placeholder="Enter WhatsApp Number"
                            validate={{
                              required: {
                                value: true,
                                errorMessage: "Enter your WhatsApp number",
                              },
                              pattern: {
                                value: "^[0-9]",
                                errorMessage: "Your Number only be 10 numbers",
                              },
                              maxLength: {
                                value: 10,
                                errorMessage: "Only 10 digit number",
                              },
                            }}
                          />

                          <Form.Label className="dm-ticket">
                            Enter Email Address
                          </Form.Label>

                          <AvField
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            name="email"
                            type="email"
                            className="position-relative"
                            placeholder="Enter Email Address"
                            validate={{
                              required: {
                                value: true,
                                errorMessage: "Enter your Email Address",
                              },
                              pattern: {
                                value:
                                  "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/",
                                errorMessage: "Please Enter Your Vailid Email",
                              },
                            }}
                          />
                        </Col>
                      </Row>
                      <div
                        className="dmticket-btn"
                        style={{ textAlign: "center", marginTop: "70px" }}
                      >
                        <Button
                          type="submit"
                          class="btn btn-success"
                          style={{
                            width: "200px",
                            textAlign: "center",
                            height: "52px",
                            borderRadius: "9px",
                            backgroundColor: "#0fa453",
                            border: "none",
                            marginBottom: 100,
                          }}
                          onClick={displayRazorpaysss}
                        >
                          PAYMENT
                        </Button>
                      </div>
                    </AvForm>
                  </div>
                </Container>
                <div className="d-none d-md-block">
                  <Footer />
                </div>
              </div>
            </>
          )}
        </>
      ) : show == 3 ? (
        <>
          <div className="d-none d-md-block">
            <Container style={{ width: "70%", paddingTop: "20px" }}>
              <Row>
                <Col>
                  <div style={{ marginTop: "15px" }}>
                    <img src={congo} alt="" style={{ height: "500px" }} />
                  </div>
                </Col>
                <Col>
                  <div style={{ paddingTop: "60px" }}>
                    <div style={{ marginBottom: "20px" }}>
                      <h3 style={{ fontWeight: "bolder" }}>CONGRATULATIONS!</h3>
                      <span style={{ color: "black" }}>
                        Your booking has been confirmed
                      </span>

                      <h3 style={{ fontWeight: "bolder" }}>Order ID</h3>
                      <span style={{ color: "black", marginBottom: "50px" }}>
                        {dmpass_id}
                      </span>
                    </div>
                    <div>
                      <div>
                        <Button
                          className="btn btn-success"
                          style={{
                            width: "186px",
                            textAlign: "center",
                            height: "52px",
                            borderRadius: "9px",
                            backgroundColor: "#0fa453",
                            fontWeight: "bold",
                            marginBottom: "20px",
                          }}
                        >
                          <FaWhatsapp
                            style={{
                              fontWeight: "bold",
                              fontSize: "30px",
                            }}
                          />
                          <span> Whatsapp Link</span>
                        </Button>
                      </div>

                      <div>
                        <Button
                          style={{
                            width: "186px",
                            textAlign: "center",
                            height: "52px",
                            borderRadius: "9px",
                            backgroundColor: " #FF4A68",
                            fontWeight: "bold",
                            marginBottom: "20px",
                          }}
                        >
                          Download E-ticket
                        </Button>
                      </div>

                      <div>
                        <Button
                          style={{
                            width: "186px",
                            textAlign: "center",
                            height: "52px",
                            borderRadius: "9px",
                            backgroundColor: "",
                            fontWeight: "bold",
                            marginBottom: "20px",
                          }}
                        >
                          <Link
                            to={`/dm-detail/${dmpass_id}`}
                            style={{ textDecoration: "none", color: "#fff" }}
                          >
                            View Ticket
                          </Link>
                        </Button>
                      </div>
                      <div>
                        <Button
                          onClick={() => history.push("/")}
                          style={{
                            width: "186px",
                            textAlign: "center",
                            height: "52px",
                            borderRadius: "9px",
                            backgroundColor: "#864BD8",
                            fontWeight: "bold",
                            marginBottom: "20px",
                          }}
                        >
                          Back to Home
                        </Button>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
            <Footer />
          </div>

          <div className="d-md-none">
            <Container style={{ width: "", paddingTop: "20px" }}>
              <Col xs={12} md={6}>
                <div style={{ marginTop: "" }}>
                  <img
                    src={congo}
                    alt=""
                    style={{ width: "100%", height: "" }}
                  />
                </div>
              </Col>
              <Col xs={12} md={6}>
                <div style={{ marginBottom: "20px", textAlign: "center" }}>
                  <h3 style={{ fontWeight: "bolder" }}>Transaction ID</h3>
                  <span style={{ color: "black", marginBottom: "50px" }}>
                    {dmpass_id}
                  </span>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div>
                    <Button
                      style={{
                        width: "186px",
                        textAlign: "center",
                        height: "52px",
                        borderRadius: "9px",
                        backgroundColor: "",
                        fontWeight: "bold",
                        marginBottom: "20px",
                      }}
                    >
                      <Link
                        to={`/dm-detail/${dmpass_id}`}
                        style={{ textDecoration: "none", color: "#fff" }}
                      >
                        View Ticket
                      </Link>
                    </Button>
                  </div>
                  <div>
                    <Button
                      style={{
                        width: "186px",
                        textAlign: "center",
                        height: "52px",
                        borderRadius: "9px",
                        backgroundColor: " #FF4A68",
                        fontWeight: "bold",
                        marginBottom: "20px",
                      }}
                    >
                      Download E-ticket
                    </Button>
                  </div>

                  <div>
                    <Button
                      onClick={() => history.push("/")}
                      style={{
                        width: "186px",
                        textAlign: "center",
                        height: "52px",
                        borderRadius: "9px",
                        backgroundColor: "#864BD8",
                        fontWeight: "bold",
                        marginBottom: "20px",
                      }}
                    >
                      Back to Home
                    </Button>
                  </div>
                </div>
              </Col>
            </Container>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default SteperDmpass;
