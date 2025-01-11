import React from "react";
import Login from "./components/login";
import "./App.css";

function App() {
  return (
    <div className="login-page">
      <header className="header">
        <h1>AIMS :: Academic Information Management System</h1>
        <p>
          By proceeding with the login you agree to the{" "}
          <a href="#">terms of use</a> of this service.
        </p>
      </header>

      <Login />
      
    </div>
  );
}

export default App;
