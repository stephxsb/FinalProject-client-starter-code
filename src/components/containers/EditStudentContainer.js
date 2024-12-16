import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStudentThunk, editStudentThunk, unenrollStudentThunk } from "../../store/thunks";  // Import the necessary thunks
import { EditStudentView } from "../views";  // The View component for editing student details
import Header from "./Header";
// import { unenrollStudent } from "../../store/actions/actionCreators";

class EditStudentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      campusId: "",
      imageURL: "",
      gpa: "",
    };
  }

  // Fetch student data when the component mounts
  componentDidMount() {
    this.props.fetchStudent(this.props.match.params.id);  // Fetch the student based on the ID from URL
  }

  // Update state when the form inputs change
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  // Handle form submission and dispatch the edit action
  handleSubmit = async (event) => {
    event.preventDefault();
    const updatedStudent = {
      id: this.props.student.id,
      firstname: this.state.firstname || this.props.student.firstname,  // Use state value or default to current student data
      lastname: this.state.lastname || this.props.student.lastname,
      email: this.state.email || this.props.student.email,
      campusId: this.state.campusId || null,
      imageURL: this.state.imageURL || this.props.student.imageURL,
      gpa: this.state.gpa || null,
    };
    if(updatedStudent.campusId==null)
      {
        await this.props.unenrollStudent(this.props.student.id) //for unenrolling
      }

    await this.props.editStudent(updatedStudent);  // Dispatch the action to edit student
    this.props.history.push(`/student/${updatedStudent.id}`);  // Redirect to the student's page after updating
  };

  render() {
    const { student } = this.props;

    // If the student data is not yet loaded, return a loading message
    if (!student) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Header />
        <EditStudentView
          student={student}  // Pass the current student data to the EditStudentView
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          state={this.state}  // Pass state to the view for form inputs
        />
      </div>
    );
  }
}

// Map state to props for accessing the student data
const mapState = (state) => {
  return {
    student: state.student,  // Access student data from the Redux state
  };
};

// Map dispatch to props for dispatching actions (thunks)
const mapDispatch = (dispatch) => {
  return {
    fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
    editStudent: (student) => dispatch(editStudentThunk(student)),  // Dispatch the edit action
    unenrollStudent: (id) => dispatch(unenrollStudentThunk(id)),
  };
};

// Export the connected component
export default connect(mapState, mapDispatch)(EditStudentContainer);
