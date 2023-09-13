import React, { useContext, useState, useEffect } from "react";
import UserContext from "../context/user";
import NavBar from "../components/NavBar";
import AllTrips from "../components/AllTrips";

const Homepage = () => {
  const userCtx = useContext(UserContext);
  console.log(userCtx);
  const [posts, setPosts] = useState([]);
  const [registeredPosts, setRegisteredPosts] = useState([]);

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
      <NavBar />
      <h1>Welcome to the Homepage</h1>
      <AllTrips
        posts={posts}
        userInfo={userCtx}
        registeredPosts={registeredPosts}
      />
    </>
  );
};

export default Homepage;
