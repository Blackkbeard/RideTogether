import React from "react";

const SignIn = () => {
  // const handleLogin = async () => {
  //   const res = await fetchData("/auth/login", "POST", { email, password });
  //   if (res.ok) {
  //     userCtx.setAccessToken(res.data.access);
  //     localStorage.setItem("accessToken", JSON.stringify(res.data.access));

  //     const decoded = jwtDecode(res.data.access);

  //     userCtx.setUserId(decoded.id);
  //     localStorage.setItem("userId", JSON.stringify(decoded.id));

  //     navigate(`/profile/${decoded.id}`);
  //   } else {
  //     alert(JSON.stringify(res.data));
  //   }
  // };

  return (
    <form>
      <input type="text" name="email" placeholder="Email" />
      <input type="password" name="password" placeholder="Password" />
      <button type="submit">Sign In</button>
    </form>
  );
};
export default SignIn;
