import { combineReducers } from "redux";
import { isFetchingCaptions } from "../posts/captions";
import { isFetchingComments } from "../posts/comments";
import { isFetchingProfile } from "../people/completeprofile";

export default combineReducers({
  captions: isFetchingCaptions,
  comments: isFetchingComments,
  completeprofile: isFetchingProfile
});
