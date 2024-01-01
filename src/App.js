import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./Components/Auth/LoginForm";
import Mailbox from "./Components/Mail/Mailbox";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log("isLoggedIn", isLoggedIn);

  return (
    <BrowserRouter>
      <Routes>
        {!isLoggedIn && <Route path="/" element={<LoginForm />} exact />}
        {isLoggedIn && <Route path="/" element={<Mailbox/>} />}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
