import React, { useContext, useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import UserContext from "../context/user";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import AllTrips from "../components/AllTrips";

const Homepage = () => {
  const userCtx = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

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
      } else {
        console.error("Error fetching all posts:", data.message);
      }
    } catch (error) {
      console.error("Error fetching all posts:", error);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  return (
    <>
      <NavBar />
      <h1>Welcome to the Homepage</h1>
      <AllTrips posts={posts} />
    </>
  );
};

export default Homepage;
