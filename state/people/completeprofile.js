import { combineReducers } from "redux";
import {
  GET_COMPLETE_PROFILE,
  GET_COMPLETE_PROFILE_FAIL,
  GET_COMPLETE_PROFILE_SUCCESS
} from "../../actions/actionTypes";

const profileByEmail = (state = {}, action) => {
  switch(action.type) {
    case GET_COMPLETE_PROFILE_SUCCESS:
      return { ...state, [action.email]: action.response }
    default:
      return state;
  }
}

export const isFetchingProfile = (state = false, action) => {
  switch(action.type) {
    case GET_COMPLETE_PROFILE:
      return true;
    case GET_COMPLETE_PROFILE_SUCCESS:
      return false;
    case GET_COMPLETE_PROFILE_FAIL:
      return false;
    default:
      return state;
  }
}

export default profileByEmail;