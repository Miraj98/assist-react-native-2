import { combineReducers } from "redux";
import {
  GET_RELATIONSHIP_SUCCESS,
  POST_FRIEND_REQUEST,
  POST_FRIEND_REQUEST_FAIL,
  POST_MESSAGE_REQUEST,
  POST_MESSAGE_REQUEST_FAIL,
  POST_HANGOUT_REQUEST,
  POST_HANGOUT_REQUEST_FAIL
} from "../../actions/actionTypes";

const byEmail = (state = {}, action) => {
  switch (action.type) {
    case GET_RELATIONSHIP_SUCCESS:
      return action.response;
    default:
      return state;
  }
};

const friendRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_FRIEND_REQUEST:
      return { ...state, [action.notify_user_email]: true };
    case POST_FRIEND_REQUEST_FAIL:
      return { ...state, [action.notify_user_email]: false };
    default:
      return state;
  }
};
const messageRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_MESSAGE_REQUEST:
      return { ...state, [action.notify_user_email]: true };
    case POST_MESSAGE_REQUEST_FAIL:
      return { ...state, [action.notify_user_email]: false };
    default:
      return state;
  }
};
const hangoutRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_HANGOUT_REQUEST:
      return { ...state, [action.notify_user_email]: true };
    case POST_HANGOUT_REQUEST_FAIL:
      return { ...state, [action.notify_user_email]: false };
    default:
      return state;
  }
};

export default combineReducers({
  byEmail,
  friendRequest: friendRequestReducer,
  messageRequest: messageRequestReducer,
  hangoutRequest: hangoutRequestReducer
});
