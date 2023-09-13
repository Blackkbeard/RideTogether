import React from "react";
import NavBar from "../components/NavBar";
import RegisteredTrips from "../components/RegisteredTrips";

const TripsRegistered = () => {
  return (
    <>
      <NavBar />
      <h1>Your Registered Trips</h1>
      <RegisteredTrips />
    </>
  );
};

export default TripsRegistered;
