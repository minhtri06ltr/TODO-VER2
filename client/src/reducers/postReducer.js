import {
  ADD_POST,
  DELETE_POST,
  FIND_POST,
  POST_LOADED_SUCCESS,
  UPDATE_POST,
} from "./types";
import { POST_LOADED_FAIL } from "./types";

export const postReducer = (state, action) => {
  //state: default is empty posts[] array we create in PostContext
  //payload is value we transmission when use dispatch
  const { type, payload } = action;
  switch (type) {
    case POST_LOADED_SUCCESS:
      return {
        ...state, //keep state (keep post:null)
        posts: payload,
        postLoading: false,
      };
    case POST_LOADED_FAIL:
      return {
        ...state, //keep state (keep post:null)
        posts: [], //return empty posts array
        postLoading: false,
      };
    case ADD_POST:
      return {
        ...state, //keep state (keep post:null,postLoading:false)
        posts: [...state.posts, payload],
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => {
          return post._id !== payload;
        }),
      };
    case FIND_POST:
      return { ...state, post: payload };
    case UPDATE_POST:
      const newPost = state.posts.map((post) => {
        return post._id === payload._id
          ? payload
          : post;
      });
      return {
        ...state,
        posts: newPost,
      };

    default:
      return state;
  }
};
