import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
// import Grid from "@mui/system/Unstable_Grid/Grid";
import {
  Container,
  Typography,
  Box,
  TextField,
  Autocomplete,
} from "@mui/material";
import Btn from "../components/Btn";
import CityEnums from "../enums/CityEnums";

const Registration = (props) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [biography, setBiography] = useState("");
  const [number, setNumber] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const registerUser = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5173/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
          full_name: name,
          location: location,
          biography: biography,
          mobile_number: number,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        props.setUserInfo(data.createdUser);
        navigate("/login");
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
    <>
      <Container maxWidth="lg">
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 3, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <Grid container alignItems="center">
            <Grid
              xs={12}
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h5" textAlign="start" margin="2rem 0">
                Register for an account
              </Typography>
              <div>
                <TextField
                  label="Email"
                  variant="outlined"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <TextField
                  label="Username"
                  variant="outlined"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div>
                <TextField
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <TextField
                  id="outlined-basic"
                  label="Full Name"
                  variant="outlined"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <TextField
                  id="outlined-basic"
                  label="Mobile Number"
                  variant="outlined"
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>
              <div>
                <TextField
                  id="outlined-basic"
                  label="Hobbies & Interests! "
                  variant="outlined"
                  onChange={(e) => setBiography(e.target.value)}
                />
              </div>
              <div>
                <Autocomplete
                  disablePortal
                  id="outlined-basic"
                  options={CityEnums}
                  inputValue={location}
                  onInputChange={(event, newInputValue) => {
                    setLocation(newInputValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Location" />
                  )}
                />
              </div>
              <Box sx={{ display: "flex", m: "0.5rem" }}>
                {" "}
                <Btn onClick={registerUser}>Register</Btn>
                <Btn
                  isBrown={true}
                  onClick={() => {
                    navigate("/sign-in");
                  }}
                >
                  Cancel
                </Btn>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Registration;
