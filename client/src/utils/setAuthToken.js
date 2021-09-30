import axios from "axios";
const setAuthToken = (token) => {
  if (token) {
    //set authorization header for all axios request
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;
  } else {
    //delete
    delete axios.defaults.headers.common[
      "Authorization"
    ];
  }
};
export default setAuthToken;
