import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import Grid from "@mui/material/Grid";

import { Container, Typography, Box, TextField, Link } from "@mui/material";
import Btn from "../components/Btn";

function Login(props) {
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const fetchData = useFetch();

  const handleLogin = async () => {
    console.log(1);
    try {
      const response = await fetch("http://127.0.0.1:5173/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      console.log(response);
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        const jwtToken = data.jwtToken; // Accessing the JWT token
        console.log(jwtToken);
        userCtx.setAccessToken(jwtToken); // Set it in the context
        localStorage.setItem("accessToken", JSON.stringify(jwtToken)); // Save to localStorage

        const decoded = jwtDecode(jwtToken); // Decode the JWT token

        userCtx.setUserId(decoded.user); // Access user_id with decoded.user
        localStorage.setItem("userId", JSON.stringify(decoded.user)); // Save to localStorage

        navigate(`/settings/${decoded.user_id}`);
      } else {
        alert(JSON.stringify(data));
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  //   return (
  //     <div>
  //       {email}
  //       {password}
  //       <input
  //         type="text"
  //         value={email}
  //         onChange={(e) => setEmail(e.target.value)}
  //         placeholder="test2@test.com"
  //       />
  //       <input
  //         type="password"
  //         value={password}
  //         onChange={(e) => setPassword(e.target.value)}
  //         placeholder="test2"
  //       />

  //       <button onClick={handleLogin}> LOGIN</button>
  //     </div>
  //   );
  return (
    <Grid
      container
      alignItems="center"
      sx={{ borderStyle: "solid", height: "100vh" }}
    >
      <Grid
        item
        xs={12}
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ borderStyle: "solid" }}
      >
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <Grid container alignItems="center">
            <Grid
              xs={6}
              container
              direction="column"
              justifycontent="center"
              alignItems="center"
            >
              <Typography variant="h5" textAlign="start" margin="2rem 0">
                Sign-in
              </Typography>
              <TextField
                label="Email"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
              />

              <Btn variant="text" onClick={handleLogin}>
                Login
              </Btn>

              <Typography
                variant="subtitle"
                textAlign="start"
                margin="1rem 0"
                sx={{ fontSize: "12px" }}
              >
                No account?{" "}
                <Link
                  onClick={() => {
                    navigate("/registration");
                  }}
                  underline="always"
                >
                  Register
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;
