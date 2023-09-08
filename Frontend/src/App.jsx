import React, { useState, useEffect } from "react";
import SignIn from "./pages/SignIn";
import { Routes, Route } from "react-router-dom";
import useFetch from "./hooks/useFetch";
import Profile from "./pages/profile";

function App() {
  const fetchData = useFetch();
  const initUserId = JSON.parse(localStorage.getItem("userId"));
  const initAccessToken = JSON.parse(localStorage.getItem("jwtToken"));
  // states
  const [accessToken, setAccessToken] = useState(initAccessToken);
  const [userId, setUserId] = useState(initUserId);
  const [userInfo, setUserInfo] = useState({});
  const [open, setOpen] = useState(false); //snackbar

  const getUserInfo = async () => {
    try {
      const response = await fetchData("/auth/login/" + userId);

      if (response.ok) {
        const data = await response.json();

        // Store userInfo to localStorage and set as initial state
        localStorage.setItem("userInfo", JSON.stringify(data));

        // Set initial userInfo from localStorage after component mounts
        const initUserInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (initUserInfo) {
          setUserInfo(initUserInfo);
        }
      } else {
        const errorData = await response.json();
        console.error("Error fetching user info:", errorData);
      }
    } catch (error) {
      console.error("There was an error fetching the user info:", error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [userId]);

  return (
    <div>
      <Routes>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route
          path="/profile/:item"
          element={<Profile open={open} setOpen={setOpen} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
