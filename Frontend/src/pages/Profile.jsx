import React, { useContext, useState, useEffect } from "react";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";

// import Grid from "@mui/material/Unstable_Grid2";
import Grid from "@mui/material/Grid";
import { Container, Typography, Box } from "@mui/material";
import Avt from "../components/Avt";
import Btn from "../components/Btn";
import NavBar from "../components/NavBar";
import AppBar from "../components/AppBar";

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

  useEffect(() => {
    getPostByUserId();
    getProfileInfo();
  }, [params.item]);

  return (
    <div>
      {/* <NavBar className="w-25 p-3"></NavBar> */}
      <AppBar />
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
                {`Name:${currProfile.display_name}`}
              </Typography>
              <Typography variant="body1" fontWeight="bold" sx={{ ml: "3rem" }}>
                {/* optional chaining for object and array to prevent page load fail */}
                {`Email: ${currProfile.email}`}
              </Typography>
              <Typography sx={{ ml: "3rem" }}>
                {`Town:${currProfile.location}`}
              </Typography>
              <Typography sx={{ ml: "3rem" }}>
                {`Bio:${currProfile.biography}`}
              </Typography>
              <Grid xs={2} sx={{ mt: "2rem" }}>
                {userCtx.userId === params.item && (
                  <Btn onClick={() => navigate("/settings")}>Settings</Btn>
                )}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
export default Profile;
