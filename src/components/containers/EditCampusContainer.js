import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCampusThunk, editCampusThunk } from "../../store/thunks";  
import EditCampusView from "../views/EditCampusView";
import Header from "./Header";

class EditCampusContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      description: "",
      imageURL: "",
    };
  }

  componentDidMount() {
    this.props.fetchCampus(this.props.match.params.id);  // Fetch campus by ID from URL
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async (formData) => {
    const updatedCampus = {
      id: this.props.campus.id,
      name: formData.name || this.props.campus.name,
      address: formData.address || this.props.campus.address,
      description: formData.description || this.props.campus.description,
      imageURL: formData.imageURL || this.props.campus.imageURL,
    };

    await this.props.editCampus(updatedCampus);  // Dispatch edit action
    this.props.history.push(`/campus/${updatedCampus.id}`);  // Redirect after update
  };

  render() {
    const { campus } = this.props;

    if (!campus) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Header />
        <EditCampusView
          campus={campus}  // Pass current campus data
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    campus: state.campus,  // Get campus data from the store
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
    editCampus: (campus) => dispatch(editCampusThunk(campus)),
  };
};

export default connect(mapState, mapDispatch)(EditCampusContainer);

// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { fetchCampusThunk, editCampusThunk } from "../../store/thunks";
// import { EditCampusView } from "../views";
// import Header from "./Header";
// import { Redirect } from "react-router-dom";

// class EditCampusContainer extends Component {
//   constructor(props) {
//     super(props);
//     const campusId = props.match?.params?.id || null;
//     this.state = {
//       campusId,
//       name: "",
//       address: "",
//       description: "",
//       imageURL: "",
//       redirect: false,
//       error: null, // To handle errors during editing
//     };
//   }

//   // Fetch campus data on mount
//   async componentDidMount() {
//     if (!this.state.campusId) return;
//     try {
//       await this.props.fetchCampus(this.state.campusId);
//       const { campus } = this.props;

//       // Pre-fill the state with fetched campus data
//       if (campus) {
//         this.setState({
//           name: campus.name || "",
//           address: campus.address || "",
//           description: campus.description || "",
//           imageURL: campus.imageURL || "",
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching campus:", error);
//       this.setState({ error: "Failed to load campus data." });
//     }
//   }

//   // Handle form input changes
//   handleChange = (event) => {
//     this.setState({ [event.target.name]: event.target.value });
//   };

//   // Handle form submission and dispatch edit action
//   handleSubmit = async (event) => {
//     event.preventDefault();
//     const { name, address, description, imageURL, campusId } = this.state;

//     const updatedCampus = {
//       id: campusId,
//       name: name || this.props.campus.name,
//       address: address || this.props.campus.address,
//       description: description || this.props.campus.description,
//       imageURL: imageURL || this.props.campus.imageURL,
//     };

//     try {
//       await this.props.editCampus(updatedCampus);
//       this.setState({ redirect: true });
//     } catch (error) {
//       console.error("Error updating campus:", error);
//       this.setState({ error: "Failed to update campus. Please try again." });
//     }
//   };

//   render() {
//     const { redirect, campusId, error, name, address, description, imageURL } = this.state;

//     if (!campusId) {
//       return <p>Error: Campus ID is missing.</p>;
//     }

//     if (redirect) {
//       return <Redirect to={`/campus/${campusId}`} />;
//     }

//     return (
//       <div>
//         <Header />
//         <EditCampusView
//           campus={this.props.campus}
//           handleChange={this.handleChange}
//           handleSubmit={this.handleSubmit}
//           error={error} // Pass errors to the view for user feedback
//           state={{ name, address, description, imageURL }} // Pass form data to the view
//         />
//       </div>
//     );
//   }
// }

// const mapState = (state) => {
//   return {
//     campus: state.campus, // Access campus data from Redux state
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
//     editCampus: (campus) => dispatch(editCampusThunk(campus)),
//   };
// };

// export default connect(mapState, mapDispatch)(EditCampusContainer);

// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { fetchCampusThunk, editCampusThunk } from "../../store/thunks";  
// import { EditCampusView } from "../views";  
// import Header from "./Header";

// class EditCampusContainer extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: "",
//       address: "",
//       description: "",
//       imageURL: "",
//     };
//   }

//   // fetch campus data when the component mounts
//   componentDidMount() {
//     this.props.fetchCampus(this.props.match.params.id);  // Fetch the campus based on the ID from URL
//   }

//   // update state when the form inputs change
//   handleChange = (event) => {
//     this.setState({
//       [event.target.name]: event.target.value,
//     });
//   };

//   // Handle form submission and dispatch the edit action
//   handleSubmit = async (event) => {
//     event.preventDefault();
//     const updatedCampus = {
//       id: this.props.campus.id,
//       name: this.state.name || this.props.campus.name,  // Use state value or default to current campus data
//       address: this.state.address || this.props.campus.address,
//       description: this.state.description || this.props.campus.description,
//       imageURL: this.state.imageURL || this.props.campus.imageURL,
//     };

//     await this.props.editCampus(updatedCampus);  // dipatch the action to edit campus
//     this.props.history.push(`/campus/${updatedCampus.id}`);  // Redirect to the campus' page after updating
//   };

//   render() {
//     const { campus } = this.props;

//     // If the campus data is not yet loaded, return a loading message
//     if (!campus) {
//       return <div>Loading...</div>;
//     }

//     return (
//       <div>
//         <Header />
//         <EditCampusView
//           campus={campus}  // Pass the current campus data to the EditCampusVIEW
//           handleChange={this.handleChange}
//           handleSubmit={this.handleSubmit}
//           state={this.state}  // Pass state to the view for form inputs
//         />
//       </div>
//     );
//   }
// }

// // Map state to props for accessing the student data
// const mapState = (state) => {
//   return {
//     campus: state.campus,  // Access campus data from the Redux state
//   };
// };

// // Map dispatch to props for dispatching actions (thunks)
// const mapDispatch = (dispatch) => {
//   return {
//     fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
//     editCampus: (campus) => dispatch(editCampusThunk(campus)),  // Dispatch the edit action
//   };
// };

// // Export the connected component
// export default connect(mapState, mapDispatch)(EditCampusContainer);