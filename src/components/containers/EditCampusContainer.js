

import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCampusThunk, editCampusThunk } from "../../store/thunks";  
import { EditCampusView } from "../views";  
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

  // fetch campus data when the component mounts
  componentDidMount() {
    this.props.fetchCampus(this.props.match.params.id);  // Fetch the campus based on the ID from URL
  }

  // update state when the form inputs change
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  // Handle form submission and dispatch the edit action
  handleSubmit = async (event) => {
    event.preventDefault();
    const updatedCampus = {
      id: this.props.campus.id,
      name: this.state.name || this.props.campus.name,  // Use state value or default to current campus data
      address: this.state.address || this.props.campus.address,
      description: this.state.description || this.props.campus.description,
      imageURL: this.state.imageURL || this.props.campus.imageURL,
    };

    await this.props.editCampus(updatedCampus);  // dipatch the action to edit campus
    this.props.history.push(`/campus/${updatedCampus.id}`);  // Redirect to the campus' page after updating
  };

  render() {
    const { campus } = this.props;

    // If the campus data is not yet loaded, return a loading message
    if (!campus) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Header />
        <EditCampusView
          campus={campus}  // Pass the current campus data to the EditCampusVIEW
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
    campus: state.campus,  // Access campus data from the Redux state
  };
};

// Map dispatch to props for dispatching actions (thunks)
const mapDispatch = (dispatch) => {
  return {
    fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
    editCampus: (campus) => dispatch(editCampusThunk(campus)),  // Dispatch the edit action
  };
};

// Export the connected component
export default connect(mapState, mapDispatch)(EditCampusContainer);