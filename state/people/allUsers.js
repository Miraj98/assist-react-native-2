import { ALL_USERS_SUCCESS } from "../../actions/actionTypes";

export default (state = {}, action) => {
  switch(action.type) {
    case ALL_USERS_SUCCESS:
      return action.response;
    default:
      return state;
  }
}