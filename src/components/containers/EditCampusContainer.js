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
