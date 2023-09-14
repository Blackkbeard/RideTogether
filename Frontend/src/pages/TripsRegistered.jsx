import React from "react";
import NavBar from "../components/NavBar";
import RegisteredTrips from "../components/RegisteredTrips";
import AppBar from "../components/AppBar";

const TripsRegistered = () => {
  return (
    <>
      <AppBar />
      <RegisteredTrips />
    </>
  );
};

export default TripsRegistered;
