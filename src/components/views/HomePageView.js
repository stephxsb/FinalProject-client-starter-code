/*==================================================
HomePageView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the home page.
================================================== */
import React from 'react';
import { Link } from 'react-router-dom';
import "../css/HomepageView.css";
import CampusImg from '../img/campus-image.jpeg';
import StudentImg from '../img/student-image.jpeg';




const HomePageView = () => {
  // Render Home page view
  return (
    <div>
      <h1>Home Page</h1>
      <div className="card-container">
        {/* Campus Card */}
        <div className="campus-card">
          <div className="campusimg">
          <img src={CampusImg} alt="Campus" className="campusimg" />
          </div>
          <h2>View Campuses</h2>
          <Link to="/campuses" className="card-button">
            Click Here!
          </Link>
        </div>

        {/* Student Card */}
        <div className="student-card">
          <div className="studentimg">
          <img src={StudentImg} alt="Student" className="studentimg" />
          </div>
          
          <h2>View Students</h2>
          <Link to="/students" className="card-button">
            Click Here!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePageView;