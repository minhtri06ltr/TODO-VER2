import {
  ADD_PROFILE,
  LOAD_PROFILE_FAIL,
  LOAD_PROFILE_SUCCESS,
} from "./types";

export const userReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_PROFILE:
      return {
        ...state,
        img: { ...state.img, payload },
      };
    case LOAD_PROFILE_SUCCESS:
      return {
        ...state, //keep state (keep post:null)
        data: payload,
      };
    case LOAD_PROFILE_FAIL:
      return {
        ...state,
        data: "",
      };
  }
};
