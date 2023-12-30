import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./Components/Auth/LoginForm";
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;