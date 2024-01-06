import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./Components/Auth/LoginForm";
import RootLayot from "./Components/Pages/RootLayout"
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import Mailbox from "./Components/Mail/Mailbox";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
      {isLoggedIn && <RootLayot/>}
      <Routes>
        {!isLoggedIn && <Route path="/" element={<LoginForm />} exact />}
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/composemail" element={<Mailbox/>}/>
      </Routes>
    </>
  );
}
export default App
