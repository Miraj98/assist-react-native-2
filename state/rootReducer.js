import { combineReducers } from "redux";
import isFetching from "./networkrequests/getrequests";
import isPosting from "./networkrequests/postrequests";
import posts from "./posts/posts";
import people from "./people/people";
import notifications from "./notifications/notifications";

export default combineReducers({
  posts,
  people,
  notifications,
  isFetching,
  isPosting
});
