/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";
import "../css/AllCampusView.css";
import "../css/CampusView.css";


// Take in props data to construct the component
const CampusView = (props) => {
  const { campus, deleteCampus, unenrollStudent } = props;
  
  // Render a single Campus view with list of its students
  //need if statement

    if (!props.campus.students.length) {
       return  <div>
          <img className="campusImage"
         src={campus.imageURL || 'https://zeta.creativecirclecdn.com/chief/original/20241008-134634-eaa-phpmf60Dp.jpg'}
         alt="Campus"
         />
       <h1>{campus.name}</h1>
      <p>{campus.address}</p>
      <p>{campus.description}</p> 
      <p>There are no students.</p>
    <br></br> <br></br>
    <Link to={`/campus/${campus.id}/edit`}>
          <button>Edit Campus</button>
        </Link>
        <br></br> <br></br>
        <Link to={'/campuses'}>
        <button onClick={() => deleteCampus(campus.id)}>
          Delete Campus
        </button>
      </Link>
      <br></br> <br></br>

<Link to={`/campus/${campus.id}/enrollstudent`}>
<button>Add New Student</button>
</Link>
    </div>;
     }
  return (
    <div>
    
    <img className="campusImage"
            src={campus.imageURL || 'https://zeta.creativecirclecdn.com/chief/original/20241008-134634-eaa-phpmf60Dp.jpg'}
            alt="Campus"
          />
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
<Link to={`/campus/${campus.id}/edit`}>
          <button>Edit Campus</button>
        </Link>
        <br></br> <br></br>
        <Link to={'/campuses'}>
        <button onClick={() => deleteCampus(campus.id)}>
          Delete Campus
        </button>
      </Link>
      <br></br> <br></br>

      <Link to={`/campus/${campus.id}/enrollstudent`}>
  <button>Add New Student</button>
</Link>
    </div>
  );
};

export default CampusView;
