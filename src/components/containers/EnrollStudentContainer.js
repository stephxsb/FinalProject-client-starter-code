import React, { Component } from "react";
import { connect } from "react-redux";
import { addStudentThunk } from '../../store/thunks';
import EnrollStudentView from "../views/EnrollStudentView";
import { Redirect } from "react-router-dom";

class EnrollStudentContainer extends Component {
  constructor(props) {
    super(props);
    const campusId = props.match?.params?.id || null;  //gets campus id from url 
    this.state = {
      campusId,
      redirect: false,
      error: null, // for handling submission errors
    };
  }

  handleSubmit = async (formData) => {
    const student = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      campusId: this.state.campusId,  //campusId is preset
      email: formData.email,
      imageURL: formData.imageURL || undefined,
      gpa: formData.gpa ? parseFloat(formData.gpa) : null,
    };

    try {
      await this.props.addStudent(student); //dispatch call to add student
      this.setState({ redirect: true });
    } catch (error) {
      console.error("Error enrolling student:", error);  //if fails, error
      this.setState({ error: "Failed to enroll student. Please try again." });
    }
  };

  render() {
    const { campusId, redirect, error } = this.state;  

    if (!campusId) {
      return <p>Error: Campus ID is missing.</p>;  //if no campusID, cerror
    }

    if (redirect) {
      return <Redirect to={`/campus/${campusId}`} />; //if redirects, to campus page
    }
//displaying the enroll student form with EnrollStudentView
    return (
      <EnrollStudentView
        handleSubmit={this.handleSubmit}
        error={error} // pass error state to the view
        presetCampusId={campusId}   //pass campusId
      />
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    addStudent: (student) => dispatch(addStudentThunk(student)),   
  };
};

export default connect(null, mapDispatch)(EnrollStudentContainer);