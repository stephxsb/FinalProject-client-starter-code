import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EnrollStudentView from '../views/EnrollStudentView';
import { enrollStudentThunk } from "../../store/thunks"; // Adjust the import path based on your project structure

const EnrollStudentContainer = ({ campusId }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    imageURL: '',
    gpa: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (data) => {
    try {
      // Dispatch the enrollStudentThunk with the submitted data
      await dispatch(enrollStudentThunk(data));
      alert('Student successfully enrolled!');
      // Optionally reset the form after successful submission
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        imageURL: '',
        gpa: '',
      });
    } catch (error) {
      console.error('Failed to enroll student:', error);
      alert('An error occurred while enrolling the student. Please try again.');
    }
  };

  return (
    <EnrollStudentView
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      presetCampusId={campusId}
    />
  );
};

export default EnrollStudentContainer;
