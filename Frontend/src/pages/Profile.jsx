import React, { useContext, useState, useEffect } from "react";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";

import Grid from "@mui/material/Unstable_Grid2";
import {
  Container,
  Typography,
  Box,
  Chip,
  Divider,
  CircularProgress,
  Snackbar,
  IconButton,
} from "@mui/material";
import Avt from "../components/Avt";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CloseIcon from "@mui/icons-material/Close";
import Btn from "../components/Btn";

const Profile = (props) => {
  const params = useParams();
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const navigate = useNavigate();

  //states
  const [posts, setPosts] = useState([]);
  const [currProfile, setCurrProfile] = useState([]);

  const getPostByUserId = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5173/api/getPost/" + userId,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            owner_id: params.item,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setListings(data);
      } else {
        const errorMessage = await response.json();
        alert(JSON.stringify(errorMessage));
        console.log(errorMessage);
      }
    } catch (error) {
      console.error("There was a problem with the network request", error);
    }
  };

  const getProfileInfo = async () => {
    try {
      const response = await fetch("/auth/accounts/" + params.item);

      if (response.ok) {
        const data = await response.json();
        setCurrProfile(data);
      } else {
        const errorMessage = await response.json();
        alert(JSON.stringify(errorMessage));
        console.log(errorMessage);
      }
    } catch (error) {
      console.error("There was a problem with the network request", error);
    }
  };

  return (
    <div>
      <h1>hello</h1>
      <Container>
        <Grid container>
          <Grid xs={2} sx={{ mt: "2rem" }}>
            <Avt size={12} src=""></Avt>
          </Grid>
          <Grid xs={8} sx={{ mt: "2rem" }}>
            <Box>
              <Typography
                variant="h4"
                marginBottom="1rem"
                sx={{ ml: "3rem", mr: "3rem" }}
              >
                {currProfile.display_name}
              </Typography>
              <Typography variant="body1" fontWeight="bold" sx={{ ml: "3rem" }}>
                {/* optional chaining for object and array to prevent page load fail */}
                {`Neighbourhood: ${currProfile.location?.[0].district}`}
              </Typography>
              <Typography sx={{ ml: "3rem" }}>
                {currProfile.biography}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
export default Profile;
