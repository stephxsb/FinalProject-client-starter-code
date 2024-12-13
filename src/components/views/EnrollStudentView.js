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
    marginTop: '-5px',
    marginBottom: '10px',
    textAlign: 'left',
  },
}));

const EnrollStudentView = (props) => {
  const { handleChange, handleSubmit, presetCampusId } = props;
  const [errors, setErrors] = useState({});
  const classes = useStyles();

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

    const formData = {
      firstname: e.target.firstname.value,
      lastname: e.target.lastname.value,
      campusId: presetCampusId, 
      email: e.target.email.value,
      imageURL: e.target.imageURL.value,
      gpa: e.target.gpa.value,
    };

    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      handleSubmit(formData); 
    }
  };

  return (
    <div>
      <h1>Enroll Student</h1>
      <div className={classes.root}>
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
              Add a Student
            </Typography>
          </div>
          <form style={{ textAlign: 'center' }} onSubmit={onSubmit}>
            <label style={{ color: '#11153e', fontWeight: 'bold' }}>First Name: </label>
            <input type="text" name="firstname" onChange={handleChange} />
            {errors.firstname && <div className={classes.errorText}>{errors.firstname}</div>}
            <br />
            <br />

            <label style={{ color: '#11153e', fontWeight: 'bold' }}>Last Name: </label>
            <input type="text" name="lastname" onChange={handleChange} />
            {errors.lastname && <div className={classes.errorText}>{errors.lastname}</div>}
            <br />
            <br />

            <label style={{ color: '#11153e', fontWeight: 'bold' }}>Campus Id: </label>
            <input
              type="text"
              name="campusId"
              value={presetCampusId} // already set campusID
              disabled // can't edit
            />
            <br />
            <br />

            <label style={{ color: '#11153e', fontWeight: 'bold' }}>Email: </label>
            <input type="text" name="email" onChange={handleChange} />
            {errors.email && <div className={classes.errorText}>{errors.email}</div>}
            <br />
            <br />

            <label style={{ color: '#11153e', fontWeight: 'bold' }}>Image URL: </label>
            <input type="text" name="imageURL" onChange={handleChange} />
            <br />
            <br />

            <label style={{ color: '#11153e', fontWeight: 'bold' }}>GPA: </label>
            <input type="text" name="gpa" onChange={handleChange} />
            {errors.gpa && <div className={classes.errorText}>{errors.gpa}</div>}
            <br />
            <br />

            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
            <br />
            <br />
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnrollStudentView;
