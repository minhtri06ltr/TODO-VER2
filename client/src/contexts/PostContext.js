import {
  createContext,
  useReducer,
  useState,
} from "react";
import axios from "axios";
import { postReducer } from "../reducers/postReducer";
import { apiUrl } from "./constants";
import {
  ADD_POST,
  DELETE_POST,
  FIND_POST,
  POST_LOADED_FAIL,
  POST_LOADED_SUCCESS,
  UPDATE_POST,
} from "../reducers/types";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  //reducer
  //{post,posts,postsLoading: default state of postState and state of postReducer}
  const [postState, dispatch] = useReducer(
    postReducer,
    {
      //when user click edit post will be attach = post's data
      //and UpdatePostModal will take post data to handle
      post: null,
      posts: [],
      postsLoading: true, //getting post on server
    },
  );
  const [showAddPostModal, setShowAddPostModal] =
    useState(false);
  const [
    showUpdatePostModal,
    setShowUpdatePostModal,
  ] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  /*Get all posts*/
  const getPosts = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/posts`,
      );
      if (response.data.success) {
        dispatch({
          type: POST_LOADED_SUCCESS,
          payload: response.data.posts,
        });
      }
    } catch (error) {
      dispatch({
        type: POST_LOADED_FAIL,
      });
    }
  };

  /*Add post */
  const addPost = async (newPost) => {
    try {
      //response: success, message,
      //post{id,description,title,url,status,user id}
      const response = await axios.post(
        `${apiUrl}/posts`,
        newPost,
      );
      if (response.data.success) {
        dispatch({
          type: ADD_POST,
          //post{id,description,title,url,status,user id}
          payload: response.data.post,
        });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : {
            success: false,
            message: "Server error",
          };
    }
  };

  /*Delete post */
  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(
        `${apiUrl}/posts/${postId}`,
      );
      if (response.data.success) {
        dispatch({
          type: DELETE_POST,
          payload: postId,
        });
        setShowToast({
          show: true,
          message: "Delete post successful",
          type: response.data.success
            ? "info"
            : "danger",
        });
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : {
            success: false,
            message: "Server error",
          };
    }
  };

  //Find post id when user is updating post
  const findPost = (postId) => {
    const post = postState.posts.find((post) => {
      return post._id === postId;
    });
    dispatch({
      type: FIND_POST,
      payload: post,
    });
  };

  /*update post */
  const updatePost = async (updatedPost) => {
    try {
      const response = await axios.put(
        `${apiUrl}/posts/${updatedPost._id}`,
        updatedPost,
      );
      if (response.data.success) {
        dispatch({
          type: UPDATE_POST,
          //post data contain new post server send back
          payload: response.data.post,
        });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : {
            success: false,
            message: "Server error",
          };
    }
  };

  //data
  const PostContextData = {
    postState,
    getPosts,
    addPost,
    deletePost,
    updatePost,
    showToast,
    findPost,
    setShowToast,
    showAddPostModal,
    setShowAddPostModal,
    showUpdatePostModal,
    setShowUpdatePostModal,
  };
  //return context
  return (
    <PostContext.Provider value={PostContextData}>
      {children}
    </PostContext.Provider>
  );
};
export default PostContextProvider;
