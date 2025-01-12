import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Faculty from "./components/faculty";
import "./App.css";

function App() {
  return (
    <Router> {/* Added Router here */}
      <div className="login-page">
        {/* <header className="header">
          <h1>AIMS :: Academic Information Management System</h1>
          <p>
            By proceeding with the login you agree to the{" "}
            <a href="#">terms of use</a> of this service.
          </p>
        </header>

        <Login /> */}
        <Routes>
          <Route path="/faculty" element={<Faculty />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
