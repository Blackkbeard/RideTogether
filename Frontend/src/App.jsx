import React from "react";
import SignIn from "./pages/SignIn";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/sign-in" element={<SignIn />}></Route>
      </Routes>
    </div>
  );
}

export default App;
