import { combineReducers } from "redux";
import { isPostingComments } from "../posts/comments";

export default combineReducers({
  comments: isPostingComments
})