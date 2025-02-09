/*==================================================
AllStudentsView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the all students view page.
================================================== */
import { Link } from "react-router-dom";
import React from "react";
import "../css/AllStudentView.css";

const AllStudentsView = (props) => {
  const {students, deleteStudent} = props;
  // If there is no student, display a message
  if (!students.length) {
    return (
    <div>
      <p>There are no students.</p>
      <Link to={`newstudent`}>
        <button>Add New Student</button>
      </Link>
    </div>
    );
  }
  
  // If there is at least one student, render All Students view 
  return (
    <div>
      <h1>All Students</h1>

      {students.map((student) => {
          let name = student.firstname + " " + student.lastname;
          return (
            <div className="students" key={student.id}>
               <img className= "studentImage" src={student.imageURL} alt="Default" />
              <Link to={`/student/${student.id}`}>
                <h2>{name}</h2>
              </Link>
              <div className="center">
              <button onClick={() => deleteStudent(student.id)} className="student-buttons">Delete Student</button>
              </div>
              <hr/>
            </div>
          );
        }
      )}
      <br/>
      <div className="center">
      <Link to={`/newstudent`}>
        <button className="new-campus">Add New Student</button>
      </Link>
      </div>
      <br/><br/>
    </div>
  );
};


export default AllStudentsView;
