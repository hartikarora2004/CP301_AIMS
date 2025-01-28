import Navbar from "./navbar";
import "./faculty.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

function Faculty() {
  const userId = localStorage.getItem("_id");
  const navigate = useNavigate();

  useEffect(() => {
    const Check = async () => {
      //console.log("User ID:", userId);
      //console.log("Role from localStorage:", localStorage.getItem("role"));

      if (!userId || localStorage.getItem("role") !== "faculty") {
        console.warn("Unauthorized access. Redirecting...");
        if(userId){
          //console.log("Inside If");
          //console.log(localStorage.getItem("role"));
          if(localStorage.getItem("role") == "student"){
            navigate("/student");
            return;
          } else if(localStorage.getItem("role") == "faculty"){
            navigate("/faculty");
            return;
          } else if(localStorage.getItem("role") == "admin"){
            navigate("/admin");
            return;
          }
        }
        navigate("/"); // Replace "/" with the actual path for unauthorized access
        return;
      }

      // Add your logic to fetch approval requests if needed
      //console.log("Fetching approval requests...");
    };
    //console.log("Checking");
    Check();
  }, [userId, navigate]);

  return (
    <div>
      <Navbar />
      <div className="home-container">
        <h1>Academic Information Management System.</h1>
        <p className="warning">
          <strong>
            Please DO NOT edit or manipulate the URLs or requests when using
            this application. Doing so may lock your account.
          </strong>
        </p>
        <p>Please proceed by choosing a menu item from the top bar.</p>
        <p>
          Before contacting <strong>@aims_help</strong> for any issues, please
          check the{" "}
          <a href="#" className="user-guide-link">
            User Guide
          </a>{" "}
          for a solution.
        </p>
        <div className="note-section">
          <h3>NOTE:</h3>
          <ul>
            <li>
              Please directly contact the course instructor for any changes to
              your enrollment requests.
            </li>
            <li>
              We have not yet fully imported your past enrollment data into this
              system. You may not get to see grades for some of your past
              courses.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Faculty;
