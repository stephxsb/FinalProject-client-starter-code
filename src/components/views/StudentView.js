/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "../css/StudentView.css";

const StudentView = (props) => {
  const { student, deleteStudent } = props;

  //  to fix loading errrors return if student is not available
  if (!student) {
    return <div>Loading...</div>; 
  }
//   // Render a single Student view
  return (
    <div className="container">
       <img className= "studentImage" src={student.imageURL} alt="Default" />
      <h1>{student.firstname + " " + student.lastname}</h1>

      <h3>
        {student.campus && student.campus.name
          ? <Link to={`/campus/${student.campus.id}`}>
          <h2>{student.campus.name}</h2>
        </Link>
          : "Student is not associated with campus"}
      </h3>
      <p>Email: {student.email}</p>
      <p>GPA: {student.gpa}</p>

      <div className="center">

        <Link to="/students">
          <button onClick={() => deleteStudent(student.id)} className="student-buttons">
            Delete Student
          </button>
        </Link>
        <Link to={`/student/${student.id}/edit`}>
          <button  className="student-buttons">Edit Student</button>
        </Link>
      </div>
    </div>
  );
};

export default StudentView;
