import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Dropdown,
  Form,
  FormControl,
  Image,
  InputGroup,
  Nav,
  Navbar,
  Offcanvas,
} from "react-bootstrap";

import { HiMenu } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import homeIcon from "../assets/icons/Homestays.png";
import loginIcon from "../assets/icons/Loginicon.png";
import logo from "../assets/img/logo.png";
import LoginModal from "../components/modal/LoginModal";
import SignupModal from "../components/modal/SignupModal";

import supportIcon from "../assets/icons/supportActive.svg";

import { logout } from "../redux/actions";
function Header({ showSignUpModal }) {
  const [modalShow, setModalShow] = useState(false);
  const [signup, setSignup] = useState(false);
  const [profile, setProfile] = useState([]);

  const modalHadler = () => {
    setModalShow(true);
  };
  const handleLoginClose = () => {
    setModalShow(false);
  };

  const dispatch = useDispatch();

  const { user_data } = useSelector((state) => state.loginReducer);

  const [show, setShow] = useState(false);
  const [search, setSearch] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (showSignUpModal) {
      setSignup(true);
    }
  }, [showSignUpModal]);

  useEffect(() => {
    const customerID = JSON.parse(localStorage.getItem("customer_id"));
    console.log("customerID", customerID);
    if (customerID) {
      let userData = JSON.parse(localStorage.getItem("user_data"));
      if (userData) {
        setProfile({ data: userData.user });
      }
    }
    // axios
    //   .get(API_PATH + `/api/v1/customer/${customerID}`)
    //   .then((response) => {
    //     setProfile(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, []);
  const history = useHistory();

  const onSearchClick = () => {
    history.push("/search");
  };

  const onSearchingHolder = () => {
    console.log("hellllooo");
  };

  const goHome = () => {
    history.push("/");
  };
  const mainLogout = () => {
    dispatch(logout());
    goHome();
  };
  const mobile = JSON.parse(localStorage.getItem("mobile"));

  const ViewTicketHandler = () => {
    history.push("/bookingprofile");
  };

  const handleSignupClose = () => {
    setSignup(false);
  };

  const handleSignupOpen = () => {
    setSignup(true);
  };
  const vendorHandler = () => {
    history.push("/profile");
  };

  return (
    <>
      <Container className="d-md-none header_div">
        <header style={{ flexDirection: "row" }}>
          <HiMenu onClick={handleShow} className="sidebar__toggler" />
          <div style={{ textAlign: "center" }}>
            <div onClick={() => history.push("/")}>
              <span className="header_title_red">Hotel</span>
              <span className="header_title_yellow">Book</span>
            </div>
            <svg
              className="searchIcon"
              onClick={onSearchClick}
              style={{ cursor: "pointer" }}
              width="25"
              height="26"
              viewBox="0 0 25 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.6582 21.6162L19.79 16.748C19.5703 16.5283 19.2725 16.4062 18.96 16.4062H18.1641C19.5117 14.6826 20.3125 12.5146 20.3125 10.1562C20.3125 4.5459 15.7666 0 10.1562 0C4.5459 0 0 4.5459 0 10.1562C0 15.7666 4.5459 20.3125 10.1562 20.3125C12.5146 20.3125 14.6826 19.5117 16.4062 18.1641V18.96C16.4062 19.2725 16.5283 19.5703 16.748 19.79L21.6162 24.6582C22.0752 25.1172 22.8174 25.1172 23.2715 24.6582L24.6533 23.2764C25.1123 22.8174 25.1123 22.0752 24.6582 21.6162ZM10.1562 16.4062C6.7041 16.4062 3.90625 13.6133 3.90625 10.1562C3.90625 6.7041 6.69922 3.90625 10.1562 3.90625C13.6084 3.90625 16.4062 6.69922 16.4062 10.1562C16.4062 13.6084 13.6133 16.4062 10.1562 16.4062Z"
                fill="#C4C4C4"
              />
            </svg>
          </div>
        </header>

        {search === true ? (
          <div className="">
            <InputGroup>
              <FormControl
                id="inlineFormInputGroup"
                onChange={onSearchingHolder}
                placeholder="Search..."
              />
            </InputGroup>
          </div>
        ) : null}

        <Offcanvas show={show} onHide={handleClose} className="sidebar">
          <Offcanvas.Header style={{ flexDirection: "row-reverse" }}>
            <HiMenu onClick={handleClose} className="sidebar__toggler" />
            {user_data !== null ? (
              <Offcanvas.Title style={{ maxWidth: "80%" }}>
                <Dropdown
                  style={{
                    backgroundColor: "transparent",
                    borderColor: "transparent",
                  }}
                >
                  <Dropdown.Toggle
                    variant="success"
                    id="dropdown-basic"
                    style={{ width: "100%", overflow: "hidden" }}
                  >
                    <Button
                      className="btn btn-success"
                      style={{ padding: "2px 10px" }}
                    >
                      Hi,
                      <span>
                        {user_data?.user?.name || profile?.data?.name}
                      </span>
                    </Button>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={vendorHandler}>
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item onClick={ViewTicketHandler}>
                      Bookings
                    </Dropdown.Item>
                    <Dropdown.Item>{mobile}</Dropdown.Item>
                    <Dropdown.Item onClick={() => mainLogout()}>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Offcanvas.Title>
            ) : (
              ""
            )}
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="me-auto sidebar__nav">
              {!user_data && (
                <a onClick={() => modalHadler()} className="sidebar__navlink">
                  <Image src={loginIcon} alt="login" />
                  <span style={{ left: "60px", position: "absolute" }}>
                    LOGIN
                  </span>
                </a>
              )}
              <NavLink to="/" className="sidebar__navlink">
                <Image src={homeIcon} alt="home" />
                <span style={{ left: "60px", position: "absolute" }}>HOME</span>
              </NavLink>

              <NavLink
                className="sidebar__navlink"
                to={{
                  pathname:
                    "https://api.whatsapp.com/send/?phone=+916267020580&text&app_absent=0",
                }}
                target="_blank"
              >
                <Image src={supportIcon} alt="support" />
                <span style={{ left: "60px", position: "absolute" }}>
                  SUPPORT
                </span>
              </NavLink>

              <a className="sidebar_links" href="tel:+916267020580">
                Contact Us
              </a>
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      </Container>

      <Container fluid className="header_div d-none d-md-block">
        <Navbar expand="lg">
          <NavLink to="/">
            <div style={{ marginLeft: "44%", marginTop: "0%" }}>
              <Image
                src={logo}
                style={{ height: "97px", width: "120px" }}
                alt="Travel Bastar"
              />
            </div>
          </NavLink>

          <Navbar.Toggle aria-controls="navbarScroll" className="toggle-icon" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="mr-auto my-2 my-lg-0"
              style={{
                maxHeight: "100px",
                // justifyContent: "center",
                alignItems: "center",
                flex: "1",
              }}
              navbarScroll
            >
              <div style={{ marginLeft: "6%" }}>
                <NavLink className="sidebar_item" to="/">
                  HOME
                </NavLink>

                <NavLink className="sidebar_item" to="/hotelList">
                  Hotel Booking
                </NavLink>
              </div>
            </Nav>
            <Form className="" style={{ marginRight: "70px" }}>
              <div className="header_right d-flex">
                <div className="header_info d-flex align-items-center"></div>
                <div className="header_info d-flex align-items-center">
                  {user_data !== null ? (
                    <Dropdown
                      style={{
                        fontSize: "16px",
                        fontWeight: "700",
                        color: "#864BD8",
                        margin: "0",
                        marginRight: "40px",
                        cursor: "pointer",
                      }}
                    >
                      <Dropdown.Toggle
                        variant=""
                        style={{}}
                        id="dropdown-basic"
                      >
                        <Button
                          className="btn btn-success"
                          style={{ padding: "2px 10px" }}
                        >
                          <span>
                            {user_data?.user?.name || profile?.data?.name}
                          </span>
                        </Button>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={vendorHandler}>
                          Profile
                        </Dropdown.Item>
                        <Dropdown.Item onClick={ViewTicketHandler}>
                          Bookings
                        </Dropdown.Item>
                        <Dropdown.Item>{mobile}</Dropdown.Item>
                        <Dropdown.Item onClick={() => mainLogout()}>
                          Logout
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    <>
                      <h4
                        style={{
                          fontSize: "16px",
                          fontWeight: "700",
                          color: "#864BD8",
                          margin: "0",
                          marginRight: "40px",
                          cursor: "pointer",
                        }}
                        onClick={() => modalHadler()}
                      >
                        LOGIN
                      </h4>
                    </>
                  )}
                </div>

                <div>
                  <svg
                    onClick={onSearchClick}
                    style={{ cursor: "pointer" }}
                    width="25"
                    height="26"
                    viewBox="0 0 25 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24.6582 21.6162L19.79 16.748C19.5703 16.5283 19.2725 16.4062 18.96 16.4062H18.1641C19.5117 14.6826 20.3125 12.5146 20.3125 10.1562C20.3125 4.5459 15.7666 0 10.1562 0C4.5459 0 0 4.5459 0 10.1562C0 15.7666 4.5459 20.3125 10.1562 20.3125C12.5146 20.3125 14.6826 19.5117 16.4062 18.1641V18.96C16.4062 19.2725 16.5283 19.5703 16.748 19.79L21.6162 24.6582C22.0752 25.1172 22.8174 25.1172 23.2715 24.6582L24.6533 23.2764C25.1123 22.8174 25.1123 22.0752 24.6582 21.6162ZM10.1562 16.4062C6.7041 16.4062 3.90625 13.6133 3.90625 10.1562C3.90625 6.7041 6.69922 3.90625 10.1562 3.90625C13.6084 3.90625 16.4062 6.69922 16.4062 10.1562C16.4062 13.6084 13.6133 16.4062 10.1562 16.4062Z"
                      fill="#C4C4C4"
                    />
                  </svg>
                </div>
              </div>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </Container>
      <LoginModal show={modalShow} handleClose={handleLoginClose} />
      <SignupModal show={signup} handleClose={handleSignupClose} />
    </>
  );
}

export default Header;
