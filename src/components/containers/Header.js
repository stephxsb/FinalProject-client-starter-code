/*==================================================
Header.js

It contains the Header component to be displayed on every page.
The header contains navigation links to every other page.
================================================== */
// Import "material" library for building UI with React components
import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUniversity } from '@fortawesome/free-solid-svg-icons'; 

import { Link } from 'react-router-dom';

// Define styling for the header
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    fontType: 'bold',
    fontFamily: 'sans-serif', 
    fontSize: '35px', 
    color: 'black',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  appBar:{
    backgroundColor: '#FAFAFA',
    shadows: ['none'],
  },
  toolbar: {
    minHeight: '150px', // Adjust this value to increase/decrease height
  },
  greeting:{
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: "50%",
    margin: "auto",
  },
  links:{
    textDecoration: 'none',
  },
  navbarButton: {
    marginRight: '10px',
    fontWeight: 'semi-bold',
    backgroundColor: '#000000',
    color: '#FFFFFF',
    border: 'none',
    '&:hover': {
      backgroundColor: '#333333', 
      borderColor: '#90CAF9', 
      color: '#1976D2', 
    },
  },
}));

// Header component, displayed on every page
// Links to every other page
const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" elevation={0} className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title} color="inherit" >
          <FontAwesomeIcon icon={faUniversity} />
            Campus Management System
          </Typography>

          <Link className={classes.links} to={'/'} >
            <Button variant="outlined" color="primary" className={classes.navbarButton}>
              Home
            </Button>
          </Link>

          <Link className={classes.links} to={'/campuses'} >
            <Button variant="outlined" color="primary"  className={classes.navbarButton}>
              All Campuses
            </Button>
          </Link>

          <Link className={classes.links} to={'/students'} >
          <Button
    variant="outlined"
    color="primary"
    className={classes.navbarButton}>
              All Students
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );    
}

export default Header;
