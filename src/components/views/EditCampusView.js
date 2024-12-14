
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import LargeTextField from '../css/LargeTextField';
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

const EditCampusView = (props) => {
  const { handleChange, handleSubmit, campus } = props;
  const [errors, setErrors] = useState({});
  const classes = useStyles();

  // validation function
  const validate = (fields) => {
    let newErrors = {};
    if (!fields.name) newErrors.name = "Name is required.";  //required name + address
    if (!fields.address) newErrors.address = "Address is required.";
    return newErrors;
  };

  const onSubmit = (e) => {
    e.preventDefault();  //prevents reloading
    const formData = {
      name: e.target.name.value,  
      address: e.target.address.value,
      description: e.target.description.value,
      imageURL: e.target.imageURL.value,
    };

    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      handleSubmit(formData);  // passes form data to Edit Campus' container's submit handler
    }
  };

  return (
    <div>
      <h1>Edit Campus</h1>
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
            Edit Campus Information
          </Typography>
        </div>
        <form onSubmit={onSubmit}>
          <label>Name: </label>
          <input type="text" name="name" defaultValue={campus.name} onChange={handleChange} />
          {errors.name && <div className={classes.errorText}>{errors.name}</div>}
          <br />
          <label>Address: </label>
          <input type="text" name="address" defaultValue={campus.address} onChange={handleChange} />
          {errors.address && <div className={classes.errorText}>{errors.address}</div>}
          <br />
          {/* <label>Description: </label>
          <input type="text" name="description" defaultValue={campus.description} onChange={handleChange} />
          <br /> */}
             <LargeTextField name="description" defaultValue={campus.description} onChange={handleChange} />
          <br />
          <br />
          <label>Image URL: </label>
          <input type="text" name="imageURL" defaultValue={campus.imageURL} onChange={handleChange} />
          <br />
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditCampusView;
