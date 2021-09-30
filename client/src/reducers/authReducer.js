// store all functions we use
import { SET_AUTH } from "./types";
export const authReducer = (state, action) => {
  //get value, function,... we transmission to payload property
  const {
    type,
    payload: { isAuthenticated, user },
  } = action;
  switch (type) {
    case SET_AUTH:
      return {
        ...state, // = default status of authContext
        //reassign state of authContext
        authLoading: false,
        isAuthenticated: isAuthenticated,
        user: user,
      };
    default:
      return state;
  }
};
