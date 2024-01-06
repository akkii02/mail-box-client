// App.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./Components/Auth/LoginForm";
import RootLayout from "./Components/Pages/RootLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import Mailbox from "./Components/Mail/Mailbox";
import MessageView from "./Components/Inbox/MessageView";
import Inbox from "./Components/Inbox/Inbox";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Routes>
      {!isLoggedIn && <Route path="/" element={<LoginForm />} exact />}
      {isLoggedIn && (
        <>
          <Route path="/" element={<RootLayout />} />
          <Route path="/composemail" element={<Mailbox />} />
          <Route path="/inbox/:emailId" element={<MessageView />} />
          <Route path="/inbox" element={<Inbox />} />
        </>
      )}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
