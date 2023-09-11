import React, { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { useNavigate } from "react-router-dom";
import Btn from "../components/Btn";
import NavBar from "../components/NavBar";
import { Container, Typography, Box } from "@mui/material";

const PostPage = (props) => {
  const userCtx = useContext(UserContext);
  const user_id = userCtx.userInfo.user_id;
  const setUserInfo = userCtx.setUserInfo;
  const [myTrips, setMyTrips] = useState([]);
  const [registeredTrips, setRegisteredTrips] = useState([]);
  const [toggle, setToggle] = useState("mytrips");
  const [selectPost, setSelectPost] = useState();
  const navigate = useNavigate();

  const handleToggle = (event, newSelection) => {
    setSelectPost(newSelection);
  };

  // Fetching Data by user
  const getPostsByUserId = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5173/api/posts/${userCtx.userInfo.user_id}`,
        {
          method: "GET", // This would be a GET request if you're fetching data
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userCtx.accessToken}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setPosts(data);
      } else {
        console.log(data);
        setPosts([]); // Reset posts state if there's an error
        setSelectPost({}); // Reset selected post state if there's an error
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  useEffect(() => {
    if (toggle === "My Trips") getPostsByUserId();
    else if (toggle === "registered trips") getPostByRegisteredId(); //get data and update transactions state
  }, [toggle, userCtx.userInfo]);
  return (
    <>
      <NavBar></NavBar>
      <Container>
        <Grid>
          <Btn onClick={() => navigate("/addpost")}>New Trip!</Btn>
        </Grid>
      </Container>
    </>
  );
};
export default PostPage;
