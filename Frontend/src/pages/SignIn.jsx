// src/components/Login.js
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);

  const handleSubmit = async () => {
    const res = await fetchData("/auth/login", "POST", { email, password });
    if (res.ok) {
      // Assuming your server sends back the access token and user_id in the response.
      userCtx.setAccessToken(res.data.access);

      const decoded = jwtDecode(res.data.access);

      userCtx.setUserId(decoded.id);

      // Storing user_id in local storage instead of the token.
      localStorage.setItem("userId", decoded.id);

      navigate(`/profile/${decoded.id}`);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
