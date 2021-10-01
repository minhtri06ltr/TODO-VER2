//handle all action login - logout
import {
  apiUrl,
  LOCAL_STORAGE_TOKEN_NAME,
} from "./constants";
import {
  createContext,
  useReducer,
  useEffect,
} from "react";
import axios from "axios";
import { authReducer } from "../reducers/authReducer";
import setAuthToken from "../utils/setAuthToken";
import { SET_AUTH } from "../reducers/types";

export const AuthContext = createContext();

//children: allow all children components to use this context
const AuthContextProvider = ({ children }) => {
  //authState: state of authContext
  //dispatch: all function store in authReducer
  const [authState, dispatch] = useReducer(
    authReducer,
    //default authState
    {
      authLoading: true,
      isAuthenticated: false,
      user: null,
    },
  );

  /* Register */
  const registerUser = async (userForm) => {
    try {
      //send form to server using axios and attach response data to response variable
      //response data: success, accessToken,message
      const response = await axios.post(
        `${apiUrl}/auth/register`,
        userForm,
      );
      if (response.data.success)
        //success = true
        //store accessToken in local storage
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken,
        );
      //call function loadUser to mark this user is logged
      await loadUser();
      return response.data;
    } catch (error) {
      if (error.response.data)
        return error.response.data;
      return {
        success: false,
        message: error.message,
      };
    }
  };
  /* End Register */

  /* Check User */
  //function check user has login or not?
  const loadUser = async () => {
    //check accessToken in local storage
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      //set authorization header for all axios request for all action after login by using file setAuthToken
      setAuthToken(
        localStorage[LOCAL_STORAGE_TOKEN_NAME],
      );
    }
    let config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization",
      },
    };
    try {
      //get data form server contains success,user{createAt,id,username}
      const response = await axios.get(
        `${apiUrl}/auth`,
        config,
      );
      if (response.data.success) {
        //Mark user has been logged
        dispatch({
          //call function SET_AUTH from authReducer by using dispatch of AuthContext
          type: SET_AUTH,
          //verify = true , data = user's data
          payload: {
            isAuthenticated: true,
            user: response.data.user,
          }, //value function SET_AUTH need
        });
      }
    } catch (error) {
      //delete token in local storage
      localStorage.removeItem(
        LOCAL_STORAGE_TOKEN_NAME,
      );
      //delete all headers from axios requests
      setAuthToken(null);
      //attach default verify = false, user's data: null
      dispatch({
        type: SET_AUTH,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  };
  /* End Check User */

  //make sure loadUser function load at least 1 time when web load
  useEffect(() => loadUser(), []);

  /* Login */
  //send user's typing form [username,password] to sever for checking login action
  const loginUser = async (userForm) => {
    try {
      //send form to server using axios and attach response data to response variable
      //response data: success, accessToken,message
      const response = await axios.post(
        `${apiUrl}/auth/login`,
        userForm,
        headers,
      );
      if (response.data.success)
        //success = true
        //store accessToken in local storage
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken,
        );
      //call function loadUser to mark this user is logged
      await loadUser();
      return response.data;
    } catch (error) {
      if (error.response.data)
        return error.response.data;
      return {
        success: false,
        message: error.message,
      };
    }
  };
  /* End login */

  /* Logout */
  const logoutUser = () => {
    localStorage.removeItem(
      LOCAL_STORAGE_TOKEN_NAME,
    );
    dispatch({
      type: SET_AUTH,
      payload: {
        isAuthenticated: false,
        user: null,
      },
    });
  };

  //Return Context - export what we want
  const authContextData = {
    loginUser,
    registerUser,
    logoutUser,
    authState,
  };
  //return provider
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
