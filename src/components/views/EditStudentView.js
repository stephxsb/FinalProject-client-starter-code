import React from "react";

const EditStudentView = ({ student, handleChange, handleSubmit, state }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="firstname"
          value={state.firstname || student.firstname}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="lastname"
          value={state.lastname || student.lastname}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={state.email || student.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Image URL:</label>
        <input
          type="text"
          name="imageURL"
          value={state.imageURL || student.imageURL}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>GPA:</label>
        <input
          type="number"
          name="gpa"
          value={state.gpa || student.gpa}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Campus:</label>
        <input
          type="text"
          name="campusId"
          value={state.campusId || student.campusId}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditStudentView;
