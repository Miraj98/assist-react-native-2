import { combineReducers } from "redux";
import profileByEmail from "./completeprofile";
import relationships from "./relationships";
import allUsers from "./allUsers";

export default combineReducers({
  allUsers,
  profileByEmail,
  relationships
});