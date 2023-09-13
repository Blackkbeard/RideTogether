import React, { useContext, useState, useEffect } from "react";
import { Card, Typography, Grid } from "@mui/material";
import UserContext from "../context/user";

const RegisteredTrips = () => {
  const [registeredTrips, setRegisteredTrips] = useState([]);
  const userCtx = useContext(UserContext);
  const user_id = userCtx.userInfo.user_id;
  console.log(user_id);
  useEffect(() => {
    const fetchRegisteredTrips = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:5173/api/post/registeredpost/" + user_id
        );

        const data = await response.json();
        if (response.ok) {
          setRegisteredTrips(data);
        } else {
          console.error("Error fetching registered trips:", data.message);
        }
      } catch (error) {
        console.error("Error fetching registered trips:", error);
      }
    };

    fetchRegisteredTrips();
  }, [user_id]);

  return (
    <Grid container spacing={2}>
      {registeredTrips.length === 0 ? (
        <Typography>No registered trips available</Typography>
      ) : (
        registeredTrips.map((trip) => (
          <Grid item xs={12} md={6} key={trip.post_id}>
            <Card variant="outlined">
              <Typography variant="h6">{trip.location}</Typography>
              <Typography>{trip.details}</Typography>
              <Typography>Ride Type: {trip.ridetype}</Typography>
              <Typography>
                From: {new Date(trip.fromdate).toLocaleDateString()}
              </Typography>
              <Typography>
                To: {new Date(trip.todate).toLocaleDateString()}
              </Typography>
              <Typography>Pax: {trip.max_pax}</Typography>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default RegisteredTrips;
