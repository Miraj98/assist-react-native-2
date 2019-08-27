import {
  GET_CAPTIONS,
  GET_CAPTIONS_FAIL,
  GET_CAPTIONS_SUCCESS,
  POST_REACTION,
  POST_REACTION_FAIL,
} from "../../actions/actionTypes";
import { combineReducers } from "redux";

const captionIds = (state = [], action) => {
  switch (action.type) {
    case GET_CAPTIONS_SUCCESS:
      return [...action.response.allIds];
    default:
      return state;
  }
};

const captionsById = (state = {}, action) => {
  switch (action.type) {
    case GET_CAPTIONS_SUCCESS:
      return { ...state, ...action.response.byId };
    case POST_REACTION:
      return {
        ...state,
        [action.captionId]: {
          ...state[action.captionId],
          postcaption_content: {
            ...state[action.captionId].postcaption_content,
            self_vote: action.vote,
            likes: action.totalLikes
          }
        }
      };
    case POST_REACTION_FAIL:
      return {
        ...state,
        [action.captionId]: {
          ...state[action.captionId],
          postcaption_content: {
            ...state[action.captionId].postcaption_content,
            self_vote: action.prevVoteState,
            likes: action.prevTotalLikes
          }
        }
      };
    default:
      return state;
  }
};

export const isFetchingCaptions = (state = false, action) => {
  switch (action.type) {
    case GET_CAPTIONS:
      return true;
    case GET_CAPTIONS_FAIL:
      return false;
    case GET_CAPTIONS_SUCCESS:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  allIds: captionIds,
  byId: captionsById
});
