// import React, { useContext, useState } from "react";
// import {
//   Card,
//   Typography,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
//   Button,
// } from "@mui/material";
// import Grid from "@mui/material/Grid";
// import UserContext from "../context/user";

// const AllTrips = (props) => {
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [selectedPost, setSelectedPost] = useState("");
//   const [imageSrc, setImageSrc] = useState("");

//   const posts = props.posts;
//   const registeredPosts = props.registeredPosts;

//   const userCtx = useContext(UserContext);
//   const { userInfo, accessToken } = userCtx;

//   const handleRegister = async () => {
//     const payload = {
//       post_id: selectedPost.post_id,
//       user_id: userInfo.user_id,
//     };
//     console.log("Payload for register:", payload);
//     try {
//       const response = await fetch(
//         "http://127.0.0.1:5173/api/post/registerPost",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             // Add any other necessary headers, e.g., Authorization for token
//           },
//           body: JSON.stringify({
//             post_id: selectedPost.post_id,
//             user_id: userInfo.user_id,
//           }),
//         }
//       );

//       const data = await response.json();

//       if (response.ok) {
//         console.log("Registration successful!", data);
//         setModalOpen(false);
//       } else {
//         console.error("Error registering:", data.message);
//         alert("You have already registered for your trip!.");
//       }
//     } catch (error) {
//       console.error("Error registering:", error);
//       console.log(2);
//     }
//   };

//   const getRandomImage = () => {
//     const totalImages = 7; // if you have 10 images named 1.jpg, 2.jpg, ... 10.jpg
//     const random = Math.floor(Math.random() * totalImages) + 1;
//     return `/bikeimages/${random}.jpeg`; // Change based on your image naming
//   };

//   return (
//     <Grid
//       container
//       direction="row"
//       alignItems="center"
//       justifyContent="center"
//       spacing={2}
//     >
//       {posts.length === 0 ? (
//         <Typography>No posts available</Typography>
//       ) : (
//         posts.map((post) => (
//           <>
//             {JSON.stringify(post)}
//             <Grid
//               item
//               direction="row"
//               alignItems="center"
//               justifyContent="center"
//               xs={12}
//               md={6}
//               key={post.post_id}
//             >
//               {/* <img src={getRandomImage()} alt="Random from storage" /> */}
//               <Card
//                 variant="outlined"
//                 onClick={() => {
//                   setSelectedPost(post);
//                   setModalOpen(true);
//                 }}
//               >
//                 <Grid
//                   item
//                   container
//                   sx={{ borderBottom: "1px solid grey", height: 250 }}
//                   direction="column"
//                   justifyContent="center"
//                 >
//                   <img
//                     src={getRandomImage()}
//                     alt="Random"
//                     style={{ width: "400px", height: "225px" }}
//                   />

//                   <Typography variant="h6">{post.location}</Typography>
//                   <Typography>Ride Type: {post.ridetype}</Typography>
//                   <Typography>
//                     From: {new Date(post.fromdate).toLocaleDateString()}
//                   </Typography>
//                   <Typography>
//                     To: {new Date(post.todate).toLocaleDateString()}
//                   </Typography>
//                   <Typography>Pax: {post.max_pax}</Typography>
//                 </Grid>
//               </Card>
//             </Grid>
//           </>
//         ))
//       )}

//       <Dialog open={isModalOpen} onClose={() => setModalOpen(false)}>
//         <DialogTitle>Destination: {selectedPost?.location}</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             <img src={getRandomImage()} alt="Random" />

//             <Typography>{selectedPost?.details}</Typography>
//             <Typography>Ride Type: {selectedPost?.ridetype}</Typography>
//             <Typography>
//               From: {new Date(selectedPost?.fromdate).toLocaleDateString()}
//             </Typography>
//             <Typography>
//               To: {new Date(selectedPost?.todate).toLocaleDateString()}
//             </Typography>
//             <Typography>Pax: {selectedPost?.max_pax}</Typography>
//             <Typography>Posted By: {selectedPost?.full_name}</Typography>
//             <Typography>Posted By: {selectedPost?.email}</Typography>
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button
//             onClick={handleRegister}
//             color="primary"
//             disabled={registeredPosts.includes(selectedPost?.post_id)}
//           >
//             Register
//           </Button>
//           <Button onClick={() => setModalOpen(false)} color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Grid>
//   );
// };

// export default AllTrips;
import React, { useContext, useState, useEffect } from "react";
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
  const [postImages, setPostImages] = useState({});

  const posts = props.posts;
  const registeredPosts = props.registeredPosts;

  const userCtx = useContext(UserContext);
  const { userInfo, accessToken } = userCtx;

  useEffect(() => {
    const images = {};
    posts.forEach((post) => {
      images[post.post_id] = getRandomImage();
    });
    setPostImages(images);
  }, [posts]);

  const getRandomImage = () => {
    const totalImages = 7;
    const random = Math.floor(Math.random() * totalImages) + 1;
    return `/bikeimages/${random}.jpeg`;
  };

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
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Registration successful!", data);
        setModalOpen(false);
      } else {
        console.error("Error registering:", data.message);
        alert("You have already registered for this trip!.");
      }
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justifyContent="center"
      spacing={2}
    >
      {posts.length === 0 ? (
        <Typography>No posts available</Typography>
      ) : (
        posts.map((post) => (
          <>
            <Grid
              item
              direction="row"
              alignItems="center"
              justifyContent="center"
              xs={12}
              md={3}
              key={post.post_id}
              sx={{ mt: "2rem" }}
            >
              <Card
                variant="outlined"
                onClick={() => {
                  setSelectedPost(post);
                  setModalOpen(true);
                }}
                style={{
                  backgroundColor: "white",
                  borderRadius: "2rem",
                  border: "3px solid grey",
                  width: "325px",
                  marginLeft: "0.75em", // <-- Add this line
                }}
              >
                <Grid
                  container
                  spacing={1}
                  sx={{ height: 350 }}
                  justifyContent="center"
                >
                  <Grid item xs={12}>
                    <img
                      src={postImages[post.post_id]}
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
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h5" align="center">
                      {post.location}
                    </Typography>

                    <Typography align="center">
                      Ride Type: {post.ridetype}
                    </Typography>

                    <Typography align="center">
                      From: {new Date(post.fromdate).toLocaleDateString()}
                    </Typography>

                    <Typography align="center">
                      To: {new Date(post.todate).toLocaleDateString()}
                    </Typography>

                    <Typography align="center">Pax: {post.max_pax}</Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </>
        ))
      )}

      <Dialog open={isModalOpen} onClose={() => setModalOpen(false)}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <DialogTitle>Destination: {selectedPost?.location}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <img
                style={{
                  width: "250px",
                  height: "180px",
                  paddingBottom: "1rem",
                }}
                src={postImages[selectedPost?.post_id]}
                alt="Random"
              />
              <Typography>Trip Details: {selectedPost?.details}</Typography>
              <Typography>Ride Type: {selectedPost?.ridetype}</Typography>
              <Typography>
                From: {new Date(selectedPost?.fromdate).toLocaleDateString()}
              </Typography>
              <Typography>
                To: {new Date(selectedPost?.todate).toLocaleDateString()}
              </Typography>
              <Typography>
                Pax: {selectedPost?.max_pax} Riders Wanted
              </Typography>
              <Typography>Posted By: {selectedPost?.full_name}</Typography>
              <Typography>Posted By: {selectedPost?.email}</Typography>
              <Typography>Posted By: {selectedPost?.mobile_number}</Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleRegister}
              color="success"
              disabled={registeredPosts.includes(selectedPost?.post_id)}
            >
              Register
            </Button>
            <Button onClick={() => setModalOpen(false)} color="error">
              Close
            </Button>
          </DialogActions>
        </Grid>
      </Dialog>
    </Grid>
  );
};

export default AllTrips;
