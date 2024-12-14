/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";
import "../css/CampusView.css";

// Take in props data to construct the component
const CampusView = (props) => {
  const { campus, deleteCampus, unenrollStudent } = props;
  
  // Render a single Campus view with list of its students
  return (
    <div>
      <h1>{campus.name}</h1>
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      {campus.students.map( student => {
        let name = student.firstname + " " + student.lastname;
        return (
          <div className="student" key={student.id}>
            <Link to={`/student/${student.id}`}>
              <h2>{name}</h2>
            </Link>
            <button onClick={() => unenrollStudent(student.id)}>
              Unenroll
            </button>
          </div>
        );
      })}
        <Link to={'/campuses'}>
        <button onClick={() => deleteCampus(campus.id)}>
          Delete Campus
        </button>
      </Link>
    </div>
  );
};

export default CampusView;