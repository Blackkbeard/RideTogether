import React from "react";
import { Card, Typography } from "@mui/material";
// import Grid from "@mui/material";
// import Grid from "@mui/material/Unstable_Grid2";
import Grid from "@mui/material/Grid";

const MyTrips = (props) => {
  return (
    <Grid container spacing={2}>
      {props.posts.length === 0 ? (
        <Typography>No posts available</Typography>
      ) : (
        props.posts.map((post) => (
          <Grid item xs={12} md={6} key={post.post_id}>
            <Card variant="outlined">
              <Typography variant="h6">{post.location}</Typography>
              <Typography>{post.details}</Typography>
              <Typography>Ride Type: {post.ridetype}</Typography>
              <Typography>
                From: {new Date(post.fromdate).toLocaleDateString()}
              </Typography>
              <Typography>
                To: {new Date(post.todate).toLocaleDateString()}
              </Typography>
              <Typography>Riders Wanted: {post.max_pax}</Typography>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default MyTrips;
