import { combineReducers } from "redux";
import {
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS,
  GET_COMMENTS_FAIL,
  POST_NEW_COMMENT,
  POST_NEW_COMMENT_FAIL,
  POST_NEW_COMMENT_SUCCESS
} from "../../actions/actionTypes";

const mapPostToComments = (state = {}, action) => {
  switch (action.type) {
    case GET_COMMENTS_SUCCESS:
      return { ...state, ...action.response.mapPostToComments };
    case POST_NEW_COMMENT_SUCCESS:
      return { ...state, [action.post_id]: [...state[action.post_id], action.response.id] }
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case GET_COMMENTS_SUCCESS:
      return { ...state, ...action.response.comments.byId };
    case POST_NEW_COMMENT_SUCCESS:
      return { ...state, [action.response.id]: action.response }
    default:
      return state;
  }
};

export const isFetchingComments = (state = false, action) => {
  switch (action.type) {
    case GET_COMMENTS:
      return true;
    case GET_COMMENTS_FAIL:
      return false;
    case GET_COMMENTS_SUCCESS:
      return false;
    default:
      return state;
  }
};

export const isPostingComments = (state = false, action) => {
  switch (action.type) {
    case POST_NEW_COMMENT:
      return true;
    case POST_NEW_COMMENT_FAIL:
    case POST_NEW_COMMENT_SUCCESS:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  mapPostToComments,
  byId
});
