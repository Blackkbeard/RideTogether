import React, { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
// import Grid from "@mui/material/Unstable_Grid2";
import Grid from "@mui/material/Grid";
import CityEnums from "../enums/CityEnums";
import {
  Autocomplete,
  Container,
  Typography,
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import Btn from "../components/Btn";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import Avt from "../components/Avt";
import NavBar from "../components/NavBar";

const Settings = (props) => {
  const userCtx = useContext(UserContext);
  const userFullInfo = userCtx.userInfo;
  const [openUpdate, setOpenUpdate] = useState(false);
  const [location, setLocation] = useState("");
  const newNameRef = useRef();
  const newBioRef = useRef();
  const newNumberRef = useRef();
  const newEmailRef = useRef();
  const newFullNameref = useRef();

  const fetchData = useFetch();

  // functions
  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  // const updateUser = async () => {
  //   const res = await fetchData(
  //     "/auth/update/" + userFullInfo._id,
  //     "PATCH",

  //     {
  //       display_name: newNameRef.current.value,
  //       biography: newBioRef.current.value,
  //       mobile_number: newNumberRef.current.value,
  //       email: newEmailRef.current.value,
  //       location: [
  //         {
  //           district: district1,
  //           postal_code: newZipRef.current.value,
  //         },
  //       ],
  //     },
  //     userCtx.accessToken
  //   );

  //   if (res.ok) {
  //     handleCloseUpdate();
  //     console.log(res.data);
  //     userCtx.getUserInfo();
  //   } else {
  //     console.log(res.data);
  //   }
  // };

  //for image upload

  const updateUser = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5173/auth/update/" + userFullInfo.id,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userCtx.accessToken, // Assuming you use Bearer tokens for auth
          },
          body: JSON.stringify({
            email: newEmailRef.current.value,
            username: newNameRef.current.value,
            full_name: newFullName.current.value,
            biography: newBioRef.current.value,
            mobile_number: newNumberRef.current.value,
            location: location,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        handleCloseUpdate();
        console.log(data);
        userCtx.getUserInfo();
      } else {
        const errorData = await response.json();
        console.log(errorData);
      }
    } catch (error) {
      console.error("There was an error updating the user:", error);
    }
  };

  const [file, setFile] = useState();

  // const submit = async (event) => {
  //   event.preventDefault();
  //   if (!file) {
  //     alert("Please select an image file");
  //     return;
  //   }
  //   const formData = new FormData();
  //   formData.append("image", file);
  //   formData.append("user_id", userFullInfo._id);

  //   const res = await fetch(
  //     import.meta.env.VITE_SERVER + "/api/images/avatars",
  //     {
  //       method: "POST",
  //       headers: {},
  //       body: formData,
  //     }
  //   );
  //   const data = await res.json();

  //   let returnValue = {};
  //   if (res.ok) {
  //     if (data.status === "error") {
  //       returnValue = { ok: false, data: data.msg };
  //       alert(JSON.stringify(returnValue.data));
  //     } else {
  //       returnValue = { ok: true, data };
  //       alert("Profile Picture updated");
  //       userCtx.getUserInfo();
  //     }
  //   } else {
  //     if (data?.errors && Array.isArray(data.errors)) {
  //       const messages = data.errors.map((item) => item.msg);
  //       returnValue = { ok: false, data: messages };
  //       alert(returnValue.data);
  //     } else if (data?.status === "error") {
  //       returnValue = { ok: false, data: data.message || data.msg };
  //       alert(returnValue.data);
  //     } else {
  //       returnValue = { ok: false, data: "An error has occurred" };
  //       alert(returnValue.data);
  //     }
  //   }
  // };

  // const fileSelected = (event) => {
  //   const file = event.target.files[0];
  //   setFile(file);
  // };

  return (
    <>
      <NavBar className="w-25 p-3"></NavBar>

      <Container maxWidth="lg">
        <Box>
          <Grid container>
            <Grid xs={12}>
              <Typography variant="h5" textAlign="start" margin="2rem 0">
                Account Settings
              </Typography>
            </Grid>
            <Grid xs={4}>
              {/* <Avt src={userCtx.userInfo.image_url} size="15"></Avt>
              <br />
              <input
                onChange={fileSelected}
                type="file"
                accept="image/*"
              ></input>

              <Btn onClick={submit}>Update</Btn> */}
            </Grid>
            <Grid xs={8}>
              <Typography
                gutterBottom
                variant="h6"
                fontWeight="bold"
                className="burgundy-text"
              >
                Name
              </Typography>
              <Typography gutterBottom variant="body1" sx={{ mb: "2rem" }}>
                {userCtx.userInfo.username}
              </Typography>

              <Typography
                gutterBottom
                variant="h6"
                fontWeight="bold"
                className="burgundy-text"
              >
                Email
              </Typography>
              <Typography gutterBottom variant="body1" sx={{ mb: "2rem" }}>
                {userCtx.userInfo.email}
              </Typography>

              <Typography
                gutterBottom
                variant="h6"
                fontWeight="bold"
                className="burgundy-text"
              >
                Biography
              </Typography>

              <Typography gutterBottom variant="body1" sx={{ mb: "2rem" }}>
                {userCtx.userInfo.biography}
              </Typography>

              <Typography
                gutterBottom
                variant="h6"
                fontWeight="bold"
                className="burgundy-text"
              >
                Mobile Number
              </Typography>
              <Typography gutterBottom variant="body1" sx={{ mb: "2rem" }}>
                {userCtx.userInfo.mobile_number}
              </Typography>

              <Typography
                gutterBottom
                variant="h6"
                fontWeight="bold"
                className="burgundy-text"
              >
                Location
              </Typography>
              <Typography gutterBottom variant="body1" sx={{ ml: "0" }}>
                {userCtx.userInfo?.location}
              </Typography>
              {/* <Typography
                gutterBottom
                variant="body1"
                sx={{ ml: "0", mb: "2rem" }}
              >
                {userCtx.userInfo?.location}
              </Typography> */}
            </Grid>
            <Grid xs={4}></Grid>
            <Grid xs={8}>
              <Btn
                startIcon={<ModeEditOutlineOutlinedIcon />}
                onClick={handleOpenUpdate}
              >
                Edit Account Info
              </Btn>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* Edit account dialogue */}
      <Dialog
        open={openUpdate}
        onClose={handleCloseUpdate}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Edit Account Info</DialogTitle>
        <DialogContent>
          <TextField
            type="text"
            margin="dense"
            defaultValue={userCtx.userInfo.display_name}
            label="Name"
            variant="outlined"
            sx={{ width: "32rem" }}
            inputRef={newNameRef}
          ></TextField>

          <TextField
            disabled
            type="text"
            margin="dense"
            label="Email"
            defaultValue={userCtx.userInfo.email}
            variant="outlined"
            sx={{ width: "32rem" }}
            inputRef={newEmailRef}
          ></TextField>

          <TextField
            type="text"
            margin="dense"
            label="Biography"
            defaultValue={userCtx.userInfo.biography}
            variant="outlined"
            sx={{ width: "32rem" }}
            inputRef={newBioRef}
          ></TextField>

          <TextField
            type="text"
            margin="dense"
            label="Mobile Number"
            defaultValue={userCtx.userInfo.mobile_number}
            variant="outlined"
            sx={{ width: "32rem" }}
            inputRef={newNumberRef}
          ></TextField>

          <Autocomplete
            disablePortal
            type="text"
            margin="dense"
            variant="outlined"
            sx={{ width: "32rem", mt: "0.4rem", mb: "0.2rem" }}
            defaultValue={userCtx.userInfo?.location}
            options={CityEnums}
            inputValue={location}
            onInputChange={(event, newInputValue) => {
              setLocation(newInputValue);
            }}
            renderInput={(params) => <TextField {...params} label="Location" />}
          />
        </DialogContent>
        <DialogActions>
          <Btn onClick={handleCloseUpdate} isBrown={true}>
            Cancel
          </Btn>
          <Btn onClick={updateUser} id="edit">
            Confirm
          </Btn>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Settings;
