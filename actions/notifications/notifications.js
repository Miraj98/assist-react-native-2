import {
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_FAIL,
  GET_NOTIFICATIONS_SUCCESS,
  IGNORE_NOTIF,
  ACCEPT_REQUEST,
  ACCEPT_REQUEST_FAIL,
  ACCEPT_REQUEST_SUCCESS,
  AUTH_TOKEN,
  USER_EMAIL,
  MARK_AS_READ,
  MARK_AS_READ_FAIL
} from "../actionTypes";

export const handleNotifResponse = notifs => {
  let returnObj = {
    notifIds: [],
    notifsById: {}
  };

  for (let i = 0; i < notifs.length; i++) {
    returnObj = {
      notifIds: [...returnObj.notifIds, notifs[i].id],
      notifsById: { ...returnObj.notifsById, [notifs[i].id]: notifs[i] }
    };
  }

  return returnObj;
};

const getNotifications = () => ({
  type: GET_NOTIFICATIONS
});
const getNotificationsSuccess = response => ({
  type: GET_NOTIFICATIONS_SUCCESS,
  response
});
const getNotificationsFail = response => ({
  type: GET_NOTIFICATIONS_FAIL,
  response
});

const acceptRequest = notifId => ({
  type: ACCEPT_REQUEST,
  id: notifId
});

const acceptRequestSuccess = (response, notifId) => ({
  type: ACCEPT_REQUEST_SUCCESS,
  response,
  id: notifId
});

const acceptRequestFail = (response, notifId) => ({
  type: ACCEPT_REQUEST_FAIL,
  response,
  id: notifId
});

export const addToSeenNotifs = id => ({
  type: ADD_TO_SEEN,
  payload: id
});

export const removeFromUnseen = id => ({
  type: REMOVE_FROM_UNSEEN,
  payload: id
});

export const ignoreNotif = id => ({
  type: IGNORE_NOTIF,
  payload: id
});

export const requestNotificationsFromApi = () => (dispatch, getState) => {
  dispatch(getNotifications());
  const REQUEST_URL =
    "https://getassist.app:8080/profiles/getnotifications/" + USER_EMAIL;
  return fetch(REQUEST_URL, {
    method: "GET",
    headers: {
      Authorization: "Token " + AUTH_TOKEN
    }
  })
    .then(rawResponse => {
      if (rawResponse.status === 200) return rawResponse.json();
      else {
        console.log(
          "Request notification errored out with status code: ",
          rawResponse.status
        );
        return -1;
      }
    })
    .then(response => {
      if (response !== -1) {
        _response = handleNotifResponse(response);
        dispatch(getNotificationsSuccess(_response));
      } else {
        dispatch(getNotificationsFail(response));
      }
    })
    .catch(err => {
      console.warn(err);
      dispatch(getNotificationsFail(err));
    });
};

const markAsRead = ids => ({
  type: MARK_AS_READ,
  ids
});
const markAsReadFail = ids => ({
  type: MARK_AS_READ_FAIL,
  ids
});

export const postMarkAsRead = notifIds => (dispatch, getState) => {
  console.log("Called");
  dispatch(markAsRead(notifIds));
  let data = {
    ids: notifIds
  };
  return fetch("https://getassist.app:8080/profiles/marknotificationsread/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + AUTH_TOKEN
    },
    body: JSON.stringify(data)
  })
    .then(rawRes => {
      if (rawRes.status === 201) return rawRes.json();
      else {
        console.log("Mark as read api status: ", rawRes.status);
        return -1;
      }
    })
    .then(jsonRes => {
      console.log(jsonRes);
      if (jsonRes === -1) dispatch(markAsReadFail(notifIds));
    })
    .catch(err => {
      console.warn(err);
      dispatch(markAsReadFail(notifIds));
    });
};

export const postAcceptRequest = notifId => (dispatch, getState) => {
  dispatch(acceptRequest(notifId));
  const REQUEST_URL = "https://getassist.app:8080/profiles/acceptrequest/";
  const data = "notificationid=" + notifId;
  return fetch(REQUEST_URL, {
    method: "POST",
    headers: {
      "Authorization": "Token " + AUTH_TOKEN,
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
    body: data
  })
    .then(rawResponse => {
      if (rawResponse.status === 201) return rawResponse.status;
      else {
        console.log("Accept Friend/Hangout/Message request errored out with status code: ", rawResponse.status)
        return -1;
      }
    })
    .then(response => {
      if (response !== -1) {
        dispatch(acceptRequestSuccess(response, notifId));
      } else dispatch(acceptRequestFail(response, notifId));
    })
    .catch(err => {
      console.warn(err);
      dispatch(acceptRequestFail(err, notifId));
    });
};
