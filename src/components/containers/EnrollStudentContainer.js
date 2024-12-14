import React, { Component } from "react";
import { connect } from "react-redux";
import { addStudentThunk } from '../../store/thunks';
import EnrollStudentView from "../views/EnrollStudentView";
import { Redirect } from "react-router-dom";

class EnrollStudentContainer extends Component {
  constructor(props) {
    super(props);
    const campusId = props.match?.params?.id || null;
    this.state = {
      campusId,
      redirect: false,
      error: null, // For handling submission errors
    };
  }

  handleSubmit = async (formData) => {
    const student = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      campusId: this.state.campusId,
      email: formData.email,
      imageURL: formData.imageURL || undefined,
      gpa: formData.gpa ? parseFloat(formData.gpa) : null,
    };

    try {
      await this.props.addStudent(student);
      this.setState({ redirect: true });
    } catch (error) {
      console.error("Error enrolling student:", error);
      this.setState({ error: "Failed to enroll student. Please try again." });
    }
  };

  render() {
    const { campusId, redirect, error } = this.state;

    if (!campusId) {
      return <p>Error: Campus ID is missing.</p>;
    }

    if (redirect) {
      return <Redirect to={`/campus/${campusId}`} />;
    }

    return (
      <EnrollStudentView
        handleSubmit={this.handleSubmit}
        error={error} // Pass error state to the view
        presetCampusId={campusId} 
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


// import Header from './Header';
// import { Component } from 'react';
// import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
// import EnrollStudentView from '../views/EnrollStudentView';
// import { addStudentThunk } from '../../store/thunks';

// class EnrollStudentContainer extends Component {
//   constructor(props) {
//     super(props);
//     const campusId = this.props.match.params.id;
//     this.state = {
//       firstname: "",
//       lastname: "",
//       campusId: campusId || null,
//       email: "",
//       imageURL: "",
//       gpa: null,
//       redirect: false
//     };
//   }

//   handleChange = (event) => {
//     this.setState({ [event.target.name]: event.target.value });
//   };

//   handleSubmit = async (event) => {
//     event.preventDefault();

//     let student = {
//       firstname: this.state.firstname,
//       lastname: this.state.lastname,
//       campusId: this.state.campusId,
//       email: this.state.email,
//       imageURL: this.state.imageURL || undefined,
//       gpa: this.state.gpa ? parseFloat(this.state.gpa) : null
//     };

//     await this.props.addStudent(student);

//     this.setState({
//       firstname: "",
//       lastname: "",
//       campusId: this.state.campusId,
//       email: "",
//       imageURL: "",
//       gpa: null,
//       redirect: true
//     });
//   };

//   // Component Will Unmount to reset state
//   componentWillUnmount() {
//     this.setState({ redirect: false });
//   }

//   render() {
//     if (this.state.redirect) {
//       return <Redirect to={`/campuses/${this.state.campusId}`} />;
//     }

//     return (
//       <div>
//         <Header />
//         <EnrollStudentView
//           handleChange={this.handleChange}
//           handleSubmit={this.handleSubmit}
//           campusId={this.state.campusId}
//         />
//       </div>
//     );
//   }
// }

// const mapDispatch = (dispatch) => {
//   return {
//     addStudent: (student) => dispatch(addStudentThunk(student)),
//   };
// };

// export default connect(null, mapDispatch)(EnrollStudentContainer);



// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useParams, useHistory } from 'react-router-dom'; // useHistory for React Router v5
// import { enrollStudentThunk } from "../../store/thunks"; 
// import EnrollStudentView from '../views/EnrollStudentView';

// const EnrollStudentContainer = () => {
//   const { id } = useParams();  // Retrieve campus id from URL params
//   const dispatch = useDispatch();
//   const history = useHistory();  // useHistory for React Router v5

//   const [formData, setFormData] = useState({
//     firstname: '',
//     lastname: '',
//     email: '',
//     imageURL: '',
//     gpa: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (data) => {
//     try {
//       // Enroll the student and then redirect without any success alert
//       await dispatch(enrollStudentThunk(data, id));  
      
//       // Use history.push for redirection in v5
//       history.push(`/campus/${id}`); // Redirect to campus page
//     } catch (error) {
//       console.error('Failed to enroll student:', error);
//       alert('An error occurred while enrolling the student. Please try again.');
//     }
//   };

//   return (
//     <EnrollStudentView
//       formData={formData}
//       handleChange={handleChange}
//       handleSubmit={handleSubmit}
//       campusId={id}  // Pass the campusId as a prop to the form
//     />
//   );
// };

// export default EnrollStudentContainer;



// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import EnrollStudentView from '../views/EnrollStudentView'; // Import the view component
// import { enrollStudentThunk } from "../../store/thunks"; // Adjust the import path based on your structure

// const EnrollStudentContainer = () => {
//   const { id } = useParams(); // Get campusId from the URL
//   const dispatch = useDispatch();

//   // Form state initialization
//   const [formData, setFormData] = useState({
//     firstname: '',
//     lastname: '',
//     email: '',
//     imageURL: '',
//     gpa: '',
//   });

//   // Handle form input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (data) => {
//     try {
//       // Dispatch action with form data and campusId
//       await dispatch(enrollStudentThunk(data, id));
//       alert('Student successfully enrolled!');
//       setFormData({
//         firstname: '',
//         lastname: '',
//         email: '',
//         imageURL: '',
//         gpa: '',
//       });
//     } catch (error) {
//       console.error('Failed to enroll student:', error);
//       alert('An error occurred while enrolling the student. Please try again.');
//     }
//   };

//   return (
//     <EnrollStudentView
//       formData={formData}
//       handleChange={handleChange}
//       handleSubmit={handleSubmit}
//       presetCampusId={id}  // Pass the campusId to the view
//     />
//   );
// };

// export default EnrollStudentContainer;


// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import EnrollStudentView from '../views/EnrollStudentView'; // Import the view component
// import { addStudentThunk } from "../../store/thunks"; // Adjust the import path based on your structure

// const EnrollStudentContainer = () => {
//   const { id } = useParams(); // Get campusId from the URL
//   const dispatch = useDispatch();

//   // Form state initialization
//   const [formData, setFormData] = useState({
//     firstname: '',
//     lastname: '',
//     email: '',
//     imageURL: '',
//     gpa: '',
//   });

//   // Handle form input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (data) => {
//     try {
//       // Dispatch action with form data and campusId
//       await dispatch(addStudentThunk(data, id));
//       alert('Student successfully enrolled!');
//       setFormData({
//         firstname: '',
//         lastname: '',
//         email: '',
//         imageURL: '',
//         gpa: '',
//       });
//     } catch (error) {
//       console.error('Failed to enroll student:', error);
//       alert('An error occurred while enrolling the student. Please try again.');
//     }
//   };

//   return (
//     <EnrollStudentView
//       formData={formData}
//       handleChange={handleChange}
//       handleSubmit={handleSubmit}
//       campusId={id}  // Pass the campusId to the view
//     />
//   );
// };

// export default EnrollStudentContainer;

// import { enrollStudentThunk } from "../../store/thunks"; // Adjust the import path based on your project structure

// const EnrollStudentContainer = ({ campusId }) => {
//   const dispatch = useDispatch();
//   const [formData, setFormData] = useState({
//     firstname: '',
//     lastname: '',
//     email: '',
//     imageURL: '',
//     gpa: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (data) => {
//     try {
//       // Dispatch the enrollStudentThunk with the submitted data
//       await dispatch(enrollStudentThunk(data, campusId));
//       alert('Student successfully enrolled!');
//       // Optionally reset the form after successful submission
//       setFormData({
//         firstname: '',
//         lastname: '',
//         email: '',
//         imageURL: '',
//         gpa: '',
//       });
//     } catch (error) {
//       console.error('Failed to enroll student:', error);
//       alert('An error occurred while enrolling the student. Please try again.');
//     }
//   };

//   return (
//     <EnrollStudentView
//       handleChange={handleChange}
//       handleSubmit={handleSubmit}
//       presetCampusId={campusId}
//     />
//   );
// };

// export default EnrollStudentContainer;
