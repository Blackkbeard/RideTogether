import React, { useState, useContext, useRef, useEffect } from "react";
import {
  Card,
  Container,
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import UserContext from "../context/user";
import dayjs from "dayjs";
import Btn from "./Btn";

const MyTrips = (props) => {
  const [open, setOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState("");
  const userCtx = useContext(UserContext);
  const [registrants, setRegistrants] = useState([]);
  const [isRegistrantsModalOpen, setRegistrantsModalOpen] = useState(false);

  const titleRef = useRef("");
  const descriptionRef = useRef("");
  const typeRef = useRef("");
  const paxRef = useRef("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [imageUrls, setImageUrls] = useState({});

  const handleOpen = (post) => {
    setCurrentPost(post);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (post) => {
    handleOpen(post);
  };

  const handleDelete = (post) => {
    deletePost(post.post_id);
  };

  const deletePost = async (postData) => {
    console.log(postData);
    try {
      const response = await fetch(
        "http://127.0.0.1:5173/api/deletepost/" + postData,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete the post.");
      }

      // Filter out the deleted post from your posts state
      const updatedPosts = props.posts.filter(
        (post) => post.post_id !== postData.post_id
      );

      props.setPosts(updatedPosts);
    } catch (error) {
      console.error("Error deleting the post:", error);
    }
  };

  const updatePost = async (postData) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5173/api/editpost/" + postData.post_id,
        {
          // Ensure this endpoint matches your backend
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update the post.");
      }

      handleClose();
      // Refresh or update frontend state if necessary.
    } catch (error) {
      console.error("Error updating the post:", error);
    }
  };

  const handleSaveEdit = () => {
    if (currentPost) {
      const postData = {
        post_id: currentPost.post_id,
        location: titleRef.current.value,
        details: descriptionRef.current.value,
        ridetype: typeRef.current.value,
        fromdate: dateFrom,
        todate: dateTo,
        max_pax: parseInt(paxRef.current.value),
      };
      updatePost(postData);
    }
  };
  const handleUsers = (post) => {
    fetchRegistrants(post.post_id);
  };

  const fetchRegistrants = async (postId) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5173/api/getRegistrants/" + postId
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch registrants.");
      }

      if (data.length === 0) {
        alert("No users have registered for this post yet.");
        return; // exit the function early
      }

      setRegistrants(data);
      setRegistrantsModalOpen(true);
    } catch (error) {
      alert("No users have registered for this post yet.");

      console.error("Error fetching the registrants:", error);
    }
  };

  const getRandomImage = () => {
    const totalImages = 7; // if you have 10 images named 1.jpg, 2.jpg, ... 10.jpg
    const random = Math.floor(Math.random() * totalImages) + 1;
    return `/bikeimages/${random}.jpeg`; // Change based on your image naming
  };
  useEffect(() => {
    const newImageUrls = {};
    props.posts.forEach((post) => {
      newImageUrls[post.post_id] = getRandomImage();
    });
    setImageUrls(newImageUrls);
  }, [props.posts]);
  return (
    <div>
      <Grid container spacing={2}>
        {props.posts.length === 0 ? (
          <Typography>No posts available</Typography>
        ) : (
          props.posts.map((post) => (
            <Grid item xs={12} md={6} key={post.post_id}>
              <Card variant="outlined" sx={{ borderRadius: "1rem" }}>
                <img src={imageUrls[post.post_id]} alt="Random" />

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
                <Button onClick={() => handleUsers(post)}>
                  Registered Users
                </Button>

                <Button onClick={() => handleEdit(post)}>Edit</Button>
                <Button onClick={() => handleDelete(post)}>Delete</Button>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          {currentPost && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid container spacing={3}>
                <Container maxWidth="lg">
                  <Box>
                    <Grid container spacing={3}>
                      <Grid
                        xs={12}
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <TextField
                          required
                          label="City, Country"
                          variant="outlined"
                          sx={{ width: "25rem", mb: "1rem" }}
                          inputRef={titleRef}
                          helperText="Name your location of travel"
                        />
                        <TextField
                          required
                          multiline
                          minRows={4}
                          label="Description"
                          variant="outlined"
                          sx={{ width: "25rem", mb: "1rem" }}
                          inputRef={descriptionRef}
                          helperText="Describe Trip details (E.g Purpose of travel, etc)"
                        />
                        <TextField
                          required
                          type="number"
                          label="No. of Pax"
                          variant="outlined"
                          sx={{ width: "25rem", mb: "1rem" }}
                          InputProps={{ inputProps: { min: 0 } }}
                          inputRef={paxRef}
                          helperText="Number of people you want to travel with"
                        />
                        <TextField
                          required
                          select
                          label="Type"
                          variant="outlined"
                          sx={{ width: "25rem", mb: "1rem" }}
                          inputRef={typeRef}
                          helperText="Type of Ride"
                        >
                          <MenuItem value="Racing">Racing</MenuItem>
                          <MenuItem value="Touring">Touring</MenuItem>
                          <MenuItem value="Leisure">Leisure</MenuItem>
                          <MenuItem value="Tracks">Tracks</MenuItem>
                        </TextField>
                        <DatePicker
                          disablePast
                          label="Available from"
                          variant="outlined"
                          sx={{ width: "25rem", mb: "1rem" }}
                          onChange={(e) =>
                            setDateFrom(e.$d.toISOString().split("T")[0])
                          }
                          slotProps={{
                            textField: {
                              required: true,
                            },
                          }}
                        />
                        <DatePicker
                          disablePast
                          minDate={dayjs(dateFrom + 48)}
                          label="Available to"
                          variant="outlined"
                          sx={{ width: "25rem" }}
                          onChange={(e) =>
                            setDateTo(e.$d.toISOString().split("T")[0])
                          }
                        />
                      </Grid>

                      <Grid
                        xs={12}
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                      ></Grid>
                    </Grid>
                  </Box>
                </Container>{" "}
              </Grid>
            </LocalizationProvider>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isRegistrantsModalOpen}
        onClose={() => setRegistrantsModalOpen(false)}
      >
        <DialogTitle>Registered Users</DialogTitle>
        <DialogContent>
          {registrants.length === 0 ? (
            <Typography>No users have registered for this post yet.</Typography>
          ) : (
            <ul>
              {registrants.map((user) => (
                <li key={user.id}>
                  Name: {user.full_name}, Number: {user.mobile_number}, Email:{" "}
                  {user.email}
                </li>
              ))}
            </ul>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setRegistrantsModalOpen(false)}
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MyTrips;
