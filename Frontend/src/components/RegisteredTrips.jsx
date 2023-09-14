import React, { useContext, useState, useEffect } from "react";
import { Card, Typography, Grid, Button } from "@mui/material";
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
  const handleDelete = async (postId) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5173/api/post/deleteRegisteredPost/" +
          postId +
          "/" +
          user_id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: user_id }), // Send the user_id in the request body
        }
      );

      if (response.ok) {
        const updatedTrips = registeredTrips.filter(
          (trip) => trip.post_id !== postId
        );
        setRegisteredTrips(updatedTrips);
      } else {
        const data = await response.json();
        console.error("Error deleting trip:", data.message);
      }
    } catch (error) {
      console.error("Error deleting trip:", error);
    }
  };
  const getRandomImage = () => {
    const totalImages = 7; // if you have 10 images named 1.jpg, 2.jpg, ... 10.jpg
    const random = Math.floor(Math.random() * totalImages) + 1;
    return `/bikeimages/${random}.jpeg`; // Change based on your image naming
  };
  return (
    <Grid container spacing={2}>
      {registeredTrips.length === 0 ? (
        <Typography>No registered trips available</Typography>
      ) : (
        registeredTrips.map((trip) => (
          <Grid item xs={12} md={6} key={trip.post_id}>
            <Card variant="outlined">
              <img src={getRandomImage()} alt="Random" />

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
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDelete(trip.post_id)}
              >
                Delete
              </Button>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default RegisteredTrips;
