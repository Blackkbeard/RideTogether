import React, { useContext, useRef, useState } from "react";
// import Grid from "@mui/material/Unstable_Grid2";
// import Grid from "@mui/material";
import Grid from "@mui/material/Grid";

import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  TextField,
  MenuItem,
  Snackbar,
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Btn from "../components/Btn";
import dayjs from "dayjs";
import NavBar from "../components/NavBar";
import AppBar from "../components/AppBar";

const AddPost = () => {
  const fetchData = useFetch();
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();

  // useRef
  const titleRef = useRef("");
  const descriptionRef = useRef("");
  const typeRef = useRef("");
  // const imageRef = useRef("");
  const paxRef = useRef("");

  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [newPostId, setPostId] = useState("");
  const [open, setOpen] = useState(false); //snackbar
  // const [file, setFile] = useState(); //image file
  // const [imageUrl, setImageUrl] = useState("");

  // function
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnackbar}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const createPost = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5173/api/newPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userCtx.accessToken}`, // assuming JWT or similar token for authentication
        },
        body: JSON.stringify({
          location: titleRef.current.value,
          details: descriptionRef.current.value,
          ridetype: typeRef.current.value,
          user_id: userCtx.userInfo.user_id, // Assuming primary keys in PostgreSQL are integers and named 'id'
          fromdate: dateFrom,
          todate: dateTo,
          max_pax: paxRef.current.value,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setOpen(true);
        setPostId(data.id); // Depending on the shape of your returned data, adjust accordingly
      } else {
        alert(JSON.stringify(data));
        console.log(data);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const testClick = () => {
    console.log(userCtx.userInfo);
  };

  return (
    <>
      {/* <NavBar className="w-25 p-3"></NavBar> */}
      <AppBar></AppBar>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container maxWidth="lg">
          <Box>
            <Grid container spacing={3}>
              <Grid
                xs={12}
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Typography variant="h5" textAlign="start" margin="2rem 0">
                  New Trip?
                </Typography>
                <Typography
                  variant="body1"
                  textAlign="start"
                  margin="0rem 0 1rem 0"
                >
                  Fill Up the form below ! <br></br>
                  Submit a new post to display for riders to Join!
                </Typography>
              </Grid>
              <Grid
                xs={12}
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <TextField
                  required
                  label="City, Country"
                  variant="outlined"
                  sx={{ width: "25rem", mb: "1rem" }}
                  inputRef={titleRef}
                  helperText="Name your location of travel"
                />
                <TextField
                  required
                  multiline
                  minRows={4}
                  label="Description"
                  variant="outlined"
                  sx={{ width: "25rem", mb: "1rem" }}
                  inputRef={descriptionRef}
                  helperText="Describe Trip details (E.g Purpose of travel, etc)"
                />
                <TextField
                  required
                  type="number"
                  label="No. of Pax"
                  variant="outlined"
                  sx={{ width: "25rem", mb: "1rem" }}
                  InputProps={{ inputProps: { min: 0 } }}
                  inputRef={paxRef}
                  helperText="Number of people you want to travel with"
                />
                <TextField
                  required
                  select
                  label="Type"
                  variant="outlined"
                  sx={{ width: "25rem", mb: "1rem" }}
                  inputRef={typeRef}
                  helperText="Type of Ride"
                >
                  <MenuItem value="Racing">Racing</MenuItem>
                  <MenuItem value="Touring">Touring</MenuItem>
                  <MenuItem value="Leisure">Leisure</MenuItem>
                  <MenuItem value="Tracks">Tracks</MenuItem>
                </TextField>
                <DatePicker
                  disablePast
                  label="Available from"
                  variant="outlined"
                  sx={{ width: "25rem", mb: "1rem" }}
                  onChange={(e) =>
                    setDateFrom(e.$d.toISOString().split("T")[0])
                  }
                  slotProps={{
                    textField: {
                      required: true,
                    },
                  }}
                />
                <DatePicker
                  disablePast
                  minDate={dayjs(dateFrom + 48)}
                  label="Available to"
                  variant="outlined"
                  sx={{ width: "25rem" }}
                  onChange={(e) => setDateTo(e.$d.toISOString().split("T")[0])}
                />
              </Grid>
              <Grid xs={7}>
                {/* <img
                  alt=""
                  src="public/sample-image.jpg"
                  sx={{ width: 150, height: 150 }}
                  display="flex"
                  justifycontent="center"
                ></img> */}

                {/* <input
                  // onChange={fileSelected}
                  type="file"
                  accept="image/*"
                ></input> */}

                {/* <Btn onClick={submit}>Upload image</Btn> */}
              </Grid>
              <Grid
                xs={12}
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Btn onClick={createPost}>Create Ride Trip!</Btn>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </LocalizationProvider>

      {/* snackbar */}
      <div>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message="Trip created!"
          action={action}
        />
      </div>
    </>
  );
};

export default AddPost;
