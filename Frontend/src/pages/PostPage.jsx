import React, { useContext, useEffect, useState } from "react";
// import Grid from "@mui/system/Unstable_Grid2";
import Grid from "@mui/material/Grid";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { useNavigate } from "react-router-dom";
import Btn from "../components/Btn";
import NavBar from "../components/NavBar";
import { Container, Typography, Box } from "@mui/material";
import MyTrips from "../components/MyTrips";
import AppBar from "../components/AppBar";

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
        "http://127.0.0.1:5173/api/getPost/" + user_id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userCtx.accessToken}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMyTrips(data); // <-- Use setMyTrips instead of setPosts
      } else {
        console.log(data);
        setMyTrips([]);
        setSelectPost({});
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    getPostsByUserId();
  }, []); // Empty dependency to make it run once on component mount

  return (
    <>
      {/* <NavBar /> */}
      <AppBar />
      <Container>
        <MyTrips posts={myTrips} />
        <Grid>
          <Btn onClick={() => navigate("/addpost")}>New Trip!</Btn>
        </Grid>
      </Container>
    </>
  );
};
export default PostPage;
