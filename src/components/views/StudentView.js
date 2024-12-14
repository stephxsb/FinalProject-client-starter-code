/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "../css/StudentView.css";

const StudentView = (props) => {
  const { student, deleteStudent } = props;

  // Render a single Student view
  return (
    <div className="container">
      <img className= "studentImage" src={student.imageURL} alt="Default" />
      <h1>{student.firstname + " " + student.lastname}</h1>
      <h3>
        {student.campus.name
          ? student.campus.name
          : "Student is not associated with campus"}
      </h3>
      <p>Email: {student.email}</p>
      <p>GPA: {student.gpa}</p>

      <div className="student-buttons">
        <Link to={"/students"}>
          <button onClick={() => deleteStudent(student.id)}>
            Delete Student
          </button>
        </Link>
        <Link to={`/student/${student.id}/edit`}>
          <button>Edit Student</button>
        </Link>
      </div>
    </div>
  );
};

export default StudentView;

