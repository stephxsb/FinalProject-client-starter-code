/*==================================================
AllCampusesView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display all campuses.
================================================== */
import React from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../css/AllCampusView.css";
import "../css/CampusView.css";
const AllCampusesView = (props) => {
  // const {campus, deleteCampus} = props;
  const {deleteCampus} = props;
  // if there is no campus, display a message.
  if (!props.allCampuses.length) {
    return <div>There are no campuses.
      <br></br> <br></br>
      <div class= "center">
      <Link to={`/newcampus`}>
        <button className="new-campus"> Add New Campus</button> 
      </Link>   
      </div>
    </div>;
  } //and button to add a campus

  // if there is at least one campus, render All Campuses view 
  return (
    <div>
      <h1>All Campuses</h1>

      {props.allCampuses.map((campus) => (
        <div key={campus.id}>
          <img className= 'campusImage'
            src={campus.imageURL || 'https://zeta.creativecirclecdn.com/chief/original/20241008-134634-eaa-phpmf60Dp.jpg'}
            alt="Campus"
          />
          <Link to={`/campus/${campus.id}`}>
            <h2>{campus.name}</h2>
          </Link>
          <h4>campus id: {campus.id}</h4>
          <p>{campus.address}</p>
          <p>{campus.description}</p>
          <button onClick={() => deleteCampus(campus.id)}>Delete</button> 
          <hr/>
        </div>
      ))}
      <br/>
      <div class= "center">
      <Link to={`/newcampus`}>
        <button className="new-campus"> Add New Campus</button> 
      </Link>   
      </div>
      <br/><br/>
    </div>
  );
};

// Validate data type of the props passed to component.
AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
  deleteCampus: PropTypes.func.isRequired,
};

export default AllCampusesView;