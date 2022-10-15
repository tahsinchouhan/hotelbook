import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "antd/dist/antd.css";
import "react-toastify/dist/ReactToastify.css";
import "./assets/css/app.css";

import "./assets/css/mediaQuery.css";
import TicketCheckOut from "./pages/booking/tickets/TicketCheckOut";
import TicketsSraech from "./pages/booking/tickets/TicketsSreach";
import Interest from "./pages/explore/Interest";
import CongratulationPage from "./pages/selectbooking/CongratulationPage";
import RatanCard from "./pages/selectbooking/RatanCard";
import AddForm from "./pages/VenderOrgAdd/AddForm";
import AddHotel from "./pages/VenderOrgAdd/AddHotel";

import Payment from "./pages/selectbooking/Payment";

import hPayment from "./pages/selectbooking/hPayment";
// import DmTicket from './pages/dm pass/dmtickets/DmTicket';

import BusTicketDetail from "./pages/selectbooking/BusTicketDetail";
import PackageTicketDetail from "./pages/selectbooking/PackageTicketDetail";
import AddInfluencer from "./pages/VenderOrgAdd/AddInfluencer";
import AddTaxi from "./pages/VenderOrgAdd/AddTaxi";
import AddTravelAgent from "./pages/VenderOrgAdd/AddTravelAgent";

/// imports Hotel Details
import "./assets/css/hotellist.css";
import HotelDetails from "./pages/Hotel/HotelDetails";
import HotelList from "./pages/Hotel/HotelList";
import HotelSingleDetails from "./pages/hotelBooking/HotelSingleDetails";
import HotelTicketPay from "./pages/selectbooking/AtHotelPay";
import Hcongratulations from "./pages/selectbooking/hCongratulations";
import HotelConfirmation from "./pages/selectbooking/HotelConfirmation";
import HotelTicketDetail from "./pages/selectbooking/HotelTicketDetail";

function App() {
  return (
    <>
      <Router>
        <div>
          <Switch>
            <Route exact path="/add-form" component={AddForm} />
            <Route exact path="/add-hotel" component={AddHotel} />
            <Route exact path="/add-taxi" component={AddTaxi} />
            <Route exact path="/add-travel-agent" component={AddTravelAgent} />
            <Route exact path="/add-influencer" component={AddInfluencer} />
            <Route
              exact
              path="/CongratulationPage"
              component={CongratulationPage}
            />
            <Route exact path="/ratancard" component={RatanCard} />
            <Route exact path="/bus-detail/:id" component={BusTicketDetail} />
            <Route
              exact
              path="/packages-detail/:id"
              component={PackageTicketDetail}
            />
            <Route exact path="/tickets_sraech" component={TicketsSraech} />
            <Route exact path="/ ticket_checkout" component={TicketCheckOut} />
            <Route exact path="/payment" component={Payment} />
            <Route exact path="/hpayment" component={hPayment} />
            <Route exact path="/interest" component={Interest} />
            {/* For Hotel Details */}
            <Route
              exact
              path="/hotelDetails/:name/:startDate/:endDate"
              component={HotelDetails}
            />
            <Route exact path="/" component={HotelList} />
            <Route exact path="/hotelList" component={HotelList} />

            <Route
              exact
              path="/hotelSingleDetails/:name"
              component={HotelSingleDetails}
            />
            <Route
              exact
              path="/Hcongratulation-page"
              component={Hcongratulations}
            />
            <Route
              exact
              path="/hotel-details-book/:id"
              component={HotelTicketDetail}
            />
            <Route
              exact
              path="/hotel-details-pay/:id"
              component={HotelTicketPay}
            />
            <Route
              exact
              path="/hotelconfirmation/:id"
              component={HotelConfirmation}
            />
          </Switch>
        </div>
      </Router>
    </>
  );
}
export default App;
