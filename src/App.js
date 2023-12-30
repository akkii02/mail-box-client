import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./Components/Auth/LoginForm";
import Welcome from "./Components/Mail/Welcome";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <BrowserRouter>
      <Routes>
        {!isLoggedIn && <Route path="/" element={<LoginForm />} />}
        {isLoggedIn ? (
          <Route path="/welcome" element={<Welcome />} />
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
