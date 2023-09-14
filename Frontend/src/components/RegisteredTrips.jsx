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
    const totalImages = 16; // if you have 10 images named 1.jpg, 2.jpg, ... 10.jpg
    const random = Math.floor(Math.random() * totalImages) + 1;
    return `/bikeimages/${random}.jpeg`; // Change based on your image naming
  };
  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justifyContent="center"
      spacing={2}
      //   xs={{ mt: "1rem" }}
    >
      {registeredTrips.length === 0 ? (
        <Typography
          sx={{
            width: "20rem",
            mt: "2rem",
            ml: "2rem",
          }}
        >
          No registered trips available
        </Typography>
      ) : (
        registeredTrips.map((trip) => (
          <Grid
            item
            direction="row"
            alignItems="center"
            justifyContent="center"
            xs={12}
            md={3}
            sx={{ mt: "2rem" }}
            key={trip.post_id}
          >
            <Card
              variant="outlined"
              style={{
                backgroundColor: "white",
                borderRadius: "1rem",
                border: "3px solid black",
                width: "325px",
                marginLeft: "0.75em", // <-- Add this line
              }}
            >
              <img
                src={getRandomImage()}
                alt="Random"
                style={{
                  width: "250px",
                  height: "180px",
                  paddingTop: "2rem",
                  // borderRadius: "1rem",
                  display: "block",
                  margin: "0 auto", // Center the image horizontally
                }}
              />
              <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
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
              </Grid>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default RegisteredTrips;
