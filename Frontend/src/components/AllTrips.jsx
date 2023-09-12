import React, { useState } from "react";
import {
  Card,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid";

const AllTrips = (props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const handleRegister = async () => {
    // Retrieve the user ID from local storage
    const userId = JSON.parse(localStorage.getItem("userId"));
    console.log("User ID for registration:", userId);

    const payload = {
      post_id: selectedPost.post_id,
      user_id: userId,
    };

    console.log("Payload for register:", payload);

    try {
      const response = await fetch(
        "http://127.0.0.1:5173/api/post/registerPost",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add any other necessary headers, e.g., Authorization for token
          },
          body: JSON.stringify({
            post_id: selectedPost.post_id,
            user_id: userId,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Registration successful!", data);
        setModalOpen(false);
      } else {
        console.error("Error registering:", data.message);
      }
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <Grid container spacing={2}>
      {props.posts.length === 0 ? (
        <Typography>No posts available</Typography>
      ) : (
        props.posts.map((post) => (
          <Grid item xs={12} md={6} key={post.post_id}>
            <Card
              variant="outlined"
              onClick={() => {
                setSelectedPost(post);
                setModalOpen(true);
              }}
            >
              <Typography variant="h6">{post.location}</Typography>
              <Typography>{post.details}</Typography>
              <Typography>Ride Type: {post.ridetype}</Typography>
              <Typography>
                From: {new Date(post.fromdate).toLocaleDateString()}
              </Typography>
              <Typography>
                To: {new Date(post.todate).toLocaleDateString()}
              </Typography>
              <Typography>Pax: {post.max_pax}</Typography>
            </Card>
          </Grid>
        ))
      )}

      <Dialog open={isModalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>{selectedPost?.location}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography>{selectedPost?.details}</Typography>
            <Typography>Ride Type: {selectedPost?.ridetype}</Typography>
            <Typography>
              From: {new Date(selectedPost?.fromdate).toLocaleDateString()}
            </Typography>
            <Typography>
              To: {new Date(selectedPost?.todate).toLocaleDateString()}
            </Typography>
            <Typography>Pax: {selectedPost?.max_pax}</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)} color="primary">
            Close
          </Button>
          <Button onClick={handleRegister} color="primary">
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default AllTrips;
