/*==================================================
/src/store/reducers/campus.js

This is a Reducer function that accepts 2 parameters: the previous state object (aka current state) and an action object. 
Depending on the Action object, the Reducer updates the State and return the new State object.
It also defines the State and its default initial value.
================================================== */
// reducers/campus.js

// reducers/campus.js

import { FETCH_CAMPUS } from '../actions/actionTypes';  // Import action types

const initialState = {
  students: [],  // Empty students array
};

const campus = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CAMPUS:
      return {
        ...state,
        ...action.payload,  // Assuming payload contains campus data with students
      };

    // case ENROLL_STUDENT:
    //   // Check if the campus ID matches the one in the action payload
    //   if (state.campusId === action.payload.campusId) {
    //     // Add the new student to the campus's students array
    //     return {
    //       ...state,
    //       students: [...state.students, action.payload.student],
    //     };
    //   }
    //   return state;

    default:
      return state;  // Return current state if the action is not recognized
  }
};

export default campus;
