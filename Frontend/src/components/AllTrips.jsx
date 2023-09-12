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
// import Grid from "@mui/material/Unstable_Grid2";
// import Grid from "@mui/material";
import Grid from "@mui/material/Grid";

const AllTrips = (props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

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
              <Typography>Pax: {post.pax}</Typography>
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
            <Typography>Pax: {selectedPost?.pax}</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default AllTrips;
