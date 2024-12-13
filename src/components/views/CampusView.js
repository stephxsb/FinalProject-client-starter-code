/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";

// Take in props data to construct the component
const CampusView = (props) => {
  const {campus, deleteCampus} = props;
  
  // Render a single Campus view with list of its students
  //need if statement
  return (
    <div>
    
    <img
            src={campus.imageURL || 'https://zeta.creativecirclecdn.com/chief/original/20241008-134634-eaa-phpmf60Dp.jpg'}
            alt="Campus"
          />
      <h1>{campus.name}</h1>
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      {campus.students.map( student => {
        let name = student.firstname + " " + student.lastname;
        return (
          <div key={student.id}>
            <Link to={`/student/${student.id}`}>
              <h2>{name}</h2>
            </Link>             
          </div>
        );
      })}

<Link to={`/campus/${campus.id}/edit`}>
          <button>Edit Campus</button>
        </Link>
        <Link to={'/campuses'}>
        <button onClick={() => deleteCampus(campus.id)}>
          Delete Campus
        </button>
      </Link>
    </div>
  );
};

export default CampusView;