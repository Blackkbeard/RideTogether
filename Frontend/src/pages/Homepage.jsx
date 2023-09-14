import React, { useContext, useState, useEffect } from "react";
import UserContext from "../context/user";
import NavBar from "../components/NavBar";
import AllTrips from "../components/AllTrips";
import Grid from "@mui/material/Grid";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AppBar from "../components/AppBar";

const Homepage = () => {
  const userCtx = useContext(UserContext);
  console.log(userCtx);
  const [posts, setPosts] = useState([]);
  const [registeredPosts, setRegisteredPosts] = useState([]);
  const [searchPost, setSearchPost] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Search filter
  const filteredPosts = () => {
    return posts.filter(
      (post) =>
        post.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.details.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  useEffect(() => {
    // Fetch all available posts
    fetchAllPosts();
    // Fetch all posts the user has registered for
    fetchRegisteredPosts();
  }, []);

  const fetchAllPosts = async () => {
    try {
      const token = localStorage.getItem("accessToken"); // Using the localStorage to get the token for authentication
      const response = await fetch("http://127.0.0.1:5173/api/getAllPosts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setPosts(data);
        setSearchPost(data);
      } else {
        console.error("Error fetching all posts:", data.message);
      }
    } catch (error) {
      console.error("Error fetching all posts:", error);
    }
  };

  const fetchRegisteredPosts = async () => {
    const userId = JSON.parse(localStorage.getItem("userId"));
    try {
      const response = await fetch(
        "http://127.0.0.1:5173/api/getPost/" + userId
      );
      const data = await response.json();
      if (response.ok) {
        setRegisteredPosts(data.map((post) => post.post_id)); // Store only post IDs for easier comparison
      } else {
        console.error("Error fetching registered posts:", data.message);
      }
    } catch (error) {
      console.error("Error fetching registered posts:", error);
    }
  };

  return (
    <>
      <AppBar> </AppBar>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <FormControl
          sx={{
            width: "20rem",
          }}
          variant="outlined"
          className="search-bar"
          color="secondary"
          onChange={(e) => setSearchTerm(e.target.value)}
        >
          <InputLabel htmlFor="outlined-adornment" sx={{ ml: "0.5rem" }}>
            <Typography>Search</Typography>
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment"
            type="text"
            endAdornment={
              <InputAdornment position="end">
                <IconButton edge="end" disabled sx={{ mr: "0.1rem" }}>
                  <SearchOutlinedIcon />
                </IconButton>
              </InputAdornment>
            }
            label="Search"
            className="search-bar"
          />
        </FormControl>
      </Grid>
      <AllTrips
        posts={filteredPosts()}
        userInfo={userCtx}
        registeredPosts={registeredPosts}
      />
    </>
  );
};

export default Homepage;
