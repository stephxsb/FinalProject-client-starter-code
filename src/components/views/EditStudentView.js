import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  formContainer: {  
    width: '500px',
    backgroundColor: '#f0f0f5',
    borderRadius: '5px',
    margin: 'auto',
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    textDecoration: 'none',
  }, 
  customizeAppBar: {
    backgroundColor: '#11153e',
    shadows: ['none'],
  },
  formTitle: {
    backgroundColor: '#c5c8d6',
    marginBottom: '15px',
    textAlign: 'center',
    borderRadius: '5px 5px 0px 0px',
    padding: '3px',
  },
  errorText: {
    color: 'red',
    fontSize: '14px',
    marginTop: '-10px',
    marginBottom: '10px',
    textAlign: 'left',
  },
}));

const EditStudentView = (props) => {
  const { handleChange, handleSubmit, student} = props;
  const [errors, setErrors] = useState({});
  const classes = useStyles();


  // validation function checks if valid input
  const validate = (fields) => {
    let newErrors = {};
    
    if (!fields.firstname) newErrors.firstname = "First Name is required.";
    if (!fields.lastname) newErrors.lastname = "Last Name is required.";
    if (!fields.email) newErrors.email = "Email is required.";
    
    if (fields.email && !/\S+@\S+\.\S+/.test(fields.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
  
    if (fields.gpa && (isNaN(fields.gpa) || fields.gpa < 0 || fields.gpa > 4)) {
      newErrors.gpa = "GPA must be a number between 0.0 and 4.0.";
    }
  
    return newErrors;
  };

  const onSubmit = (e) => {
    e.preventDefault();

   //gathers field values for validation
    const formData = {
      firstname: e.target.firstname.value,
      lastname: e.target.lastname.value,
      campusId: e.target.campusId.value,
      email: e.target.email.value,
      imageURL: e.target.imageURL.value,
      gpa: e.target.gpa.value,
    };

  //validates field values
    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
   //if errors no submision
      setErrors(validationErrors);
    } else {
          // clear errors- allow submission
      setErrors({});
      handleSubmit(e);
    }
  };

  return (
    <div>
      <h1>Edit Student</h1>
      <div className={classes.formContainer}>
        <div className={classes.formTitle}>
          <Typography
            style={{
              fontWeight: 'bold',
              fontFamily: 'Courier, sans-serif',
              fontSize: '20px',
              color: '#11153e',
            }}
          >
            Edit Student Information
          </Typography>
        </div>
        <form onSubmit={onSubmit}>
          <label>First Name: </label>
          <input type="text" name="firstname" defaultValue={student.firstname} onChange={handleChange} />
          {errors.firstname && <div className={classes.errorText}>{errors.firstname}</div>}
          <br />
          <label>Last Name: </label>
          <input type="text" name="lastname" defaultValue={student.lastname} onChange={handleChange} />
          {errors.lastname && <div className={classes.errorText}>{errors.lastname}</div>}
          <br />
          <label>Campus ID: </label>
          <input type="text" name="campusId" defaultValue={student.campusId} onChange={handleChange} />
          <br />

          <label>Email: </label>
          <input type="email" name="email" defaultValue={student.email} onChange={handleChange} />
          {errors.email && <div className={classes.errorText}>{errors.email}</div>}
          <br />
          <label>Image URL: </label>
          <input type="text" name="imageURL" defaultValue={student.imageURL} onChange={handleChange} />
          <br />
          <label>GPA: </label>
          <input type="text" name="gpa" defaultValue={student.gpa} onChange={handleChange} />
          {errors.gpa && <div className={classes.errorText}>{errors.gpa}</div>}
          <br />
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditStudentView;