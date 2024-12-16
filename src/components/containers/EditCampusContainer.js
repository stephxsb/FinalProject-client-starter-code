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
    this.props.fetchCampus(this.props.match.params.id);  // fetches campus by ID from URL
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async (formData) => {
    const updatedCampus = {
      id: this.props.campus.id,
      name: formData.name,
      address: formData.address,
      description: formData.description,
      imageURL: formData.imageURL || this.props.campus.imageURL,
    };

    await this.props.editCampus(updatedCampus);  // dispatches edit action
    this.props.history.push(`/campus/${updatedCampus.id}`);  // redirects after update to campus page
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
          campus={campus}  // passes current campus data
          handleChange={this.handleChange}  //handles change of input
          handleSubmit={this.handleSubmit}  //handles submission of input
        />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    campus: state.campus,  // gets campus data from the store
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCampus: (id) => dispatch(fetchCampusThunk(id)),  //fetches campus id
    editCampus: (campus) => dispatch(editCampusThunk(campus)),   //edits campus
  };
};

export default connect(mapState, mapDispatch)(EditCampusContainer);
