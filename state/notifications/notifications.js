import { combineReducers } from "redux";
import {
  GET_NOTIFICATIONS_SUCCESS,
  REMOVE_FROM_UNSEEN,
  MARK_AS_READ,
  ADD_TO_SEEN,
  ACCEPT_REQUEST,
  ACCEPT_REQUEST_FAIL,
  ACCEPT_REQUEST_SUCCESS,
  IGNORE_NOTIF
} from "../../actions/actionTypes";

const newNotifs = (state = [], action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS_SUCCESS:
      return [...action.response.notifIds];
    case REMOVE_FROM_UNSEEN:
      return state.filter(notifId => notifId !== action.payload);
    case IGNORE_NOTIF:
      return [...state.filter(id => id !== action.payload)];
    default:
      return state;
  }
};

const notifsById = (state = {}, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS_SUCCESS:
      return { ...state, ...action.response.notifsById };
    case REMOVE_FROM_UNSEEN:
      return {
        ...state,
        [action.payload]: { ...state[action.payload], ignore: true }
      };
    case MARK_AS_READ:
      let newstate = state;
      for (let i = 0; i < action.ids.length; i++) {
        newstate = {
          ...newstate,
          [action.ids[i]]: { ...newstate[action.ids[i]], read: true }
        };
      }
      return newstate;
    default:
      return state;
  }
};

const seenNotifsReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_SEEN:
      return [action.payload, ...state];
    default:
      return state;
  }
};

const notifAcceptRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case ACCEPT_REQUEST:
      return { ...state, [action.id]: { pending: true, successful: true } };
    case ACCEPT_REQUEST_SUCCESS:
      return { ...state, [action.id]: { pending: false, successful: true } };
    case ACCEPT_REQUEST_FAIL:
      return { ...state, [action.id]: { pending: false, successful: false } };
    default:
      return state;
  }
};

const ignoreNotifsReducer = (state = {}, action) => {
  switch (action.type) {
    case IGNORE_NOTIF:
      return { ...state, [action.payload]: true };
    default:
      return state;
  }
};

const notifications = combineReducers({
  unseen: newNotifs,
  byId: notifsById,
  seen: seenNotifsReducer,
  networkRequests: notifAcceptRequestReducer,
  ignoreNotifs: ignoreNotifsReducer
});

export default notifications;
