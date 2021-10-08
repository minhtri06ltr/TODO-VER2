import {
  createContext,
  useContext,
  useReducer,
} from "react";
import axios from "axios";
import { apiUrl } from "./constants";
import { userReducer } from "../reducers/userRudecer";
import {
  LOAD_PROFILE_FAIL,
  LOAD_PROFILE_SUCCESS,
} from "../reducers/types";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [imgState, dispatch] = useReducer(
    userReducer,
    {
      img: "",
    },
  );
  const updateImg = async (imgData) => {
    try {
      const response = await axios.put(
        `${apiUrl}/profile`,
        imgData,
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  const getImg = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/profile`,
      );
      console.log(response);
      if (!response)
        console.log("ko co response");
      if (response.data.success) {
        dispatch({
          type: LOAD_PROFILE_SUCCESS,
          payload: response.data.imgData,
        });
      }
    } catch (error) {
      dispatch({
        type: LOAD_PROFILE_FAIL,
      });
    }
  };
  const UserContextDate = {
    updateImg,
    getImg,
    imgState,
  };
  return (
    <UserContext.Provider value={UserContextDate}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
