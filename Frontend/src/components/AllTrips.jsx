import React, { useContext, useState } from "react";
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
import UserContext from "../context/user";

const AllTrips = (props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState("");
  const [imageSrc, setImageSrc] = useState("");

  const posts = props.posts;
  const registeredPosts = props.registeredPosts;

  const userCtx = useContext(UserContext);
  const { userInfo, accessToken } = userCtx;

  const handleRegister = async () => {
    const payload = {
      post_id: selectedPost.post_id,
      user_id: userInfo.user_id,
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
            user_id: userInfo.user_id,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Registration successful!", data);
        setModalOpen(false);
      } else {
        console.error("Error registering:", data.message);
        alert("You have already registered for your trip!.");
      }
    } catch (error) {
      console.error("Error registering:", error);
      console.log(2);
    }
  };

  //   const getRandomImage = () => {
  //     const fileCount = fs.readdirSync(path.join(process.cwd(), "public"));
  //     const random = Math.ceil(Math.random() * fileCount);

  //     return "/" + random + ".jpg";
  //   };

  //   useEffect(() => {
  //     // Fetch random image when component mounts
  //     fetch("http://127.0.0.1:5173/api/randomimage")
  //       .then((res) => res.blob())
  //       .then((blob) => {
  //         const imgURL = URL.createObjectURL(blob);
  //         setImageSrc(imgURL);
  //       })
  //       .catch((error) => console.error("Error fetching image:", error));
  //   }, []);

  return (
    <Grid container spacing={2}>
      {posts.length === 0 ? (
        <Typography>No posts available</Typography>
      ) : (
        posts.map((post) => (
          <>
            {JSON.stringify(post)}
            <Grid item xs={12} md={6} key={post.post_id}>
              {/* <img src={getRandomImage()} alt="Random from storage" /> */}
              <Card
                variant="outlined"
                onClick={() => {
                  setSelectedPost(post);
                  setModalOpen(true);
                }}
              >
                <Typography variant="h6">{post.location}</Typography>
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
          </>
        ))
      )}

      <Dialog open={isModalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>Destination: {selectedPost?.location}</DialogTitle>
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
            <Typography>Posted By: {selectedPost?.full_name}</Typography>
            <Typography>Posted By: {selectedPost?.email}</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleRegister}
            color="primary"
            disabled={registeredPosts.includes(selectedPost?.post_id)}
          >
            Register
          </Button>
          <Button onClick={() => setModalOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default AllTrips;
