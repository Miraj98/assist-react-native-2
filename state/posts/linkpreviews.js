import { FETCH_LINK_PREVIEWS } from "../../actions/actionTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_LINK_PREVIEWS:
      return { ...state, [action.post_id]: action.linkPreview };
    default:
      return state;
  }
};
