import React, { useContext, useRef, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { useNavigate } from "react-router-dom";
import Btn from "../components/Btn";
import NavBar from "../components/NavBar";
import { Container, Typography, Box } from "@mui/material";

const PostPage = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <h1>hello</h1>
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
