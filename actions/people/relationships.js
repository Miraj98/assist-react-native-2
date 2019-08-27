import {
  POST_FRIEND_REQUEST,
  POST_HANGOUT_REQUEST,
  POST_MESSAGE_REQUEST,
  GET_RELATIONSHIP,
  GET_RELATIONSHIP_FAIL,
  GET_RELATIONSHIP_SUCCESS,
  AUTH_TOKEN,
  USER_EMAIL
} from "../actionTypes";

/****************************************************************************************************/

const REQUEST_DICTIONARY = {
  "2": POST_FRIEND_REQUEST,
  "3": POST_MESSAGE_REQUEST,
  "4": POST_HANGOUT_REQUEST
};

const isPostingRequestNotification = (requestType, notify_user_email) => ({
  type: REQUEST_DICTIONARY[requestType],
  notify_user_email
});
const postRequestNotificationSuccess = (response, requestType) => ({
  type: REQUEST_DICTIONARY[requestType] + "_SUCCESS",
  response
});
const postRequestNotificationFail = (
  response,
  requestType,
  notify_user_email
) => ({
  type: REQUEST_DICTIONARY[requestType] + "_FAIL",
  response,
  notify_user_email
});

// FRIENDS: 2, MESSAGE: 3, HANGOUT: 4
export const postRequestNotification = (action, notify_user_email) => (
  dispatch,
  getState
) => {
  const REQUEST_URL = "https://getassist.app:8080/profiles/createnotification/";
  dispatch(isPostingRequestNotification(action, notify_user_email));
  let actor_email = USER_EMAIL;
  let data =
    "actor_email=" +
    actor_email +
    "&action=" +
    action +
    "&notify_user_email=" +
    notify_user_email;
  return fetch(REQUEST_URL, {
    method: "POST",
    headers: {
      Authorization: "Token " + AUTH_TOKEN,
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
    body: data
  })
    .then(rawResponse => {
      if (rawResponse.status === 201) return rawResponse.json();
      else return -1;
    })
    .then(response => {
      if (response !== 1) {
        // console.log(response)
        dispatch(postRequestNotificationSuccess(response, action));
      } else {
        dispatch(
          postRequestNotificationFail(response, action, notify_user_email)
        );
      }
    })
    .catch(err => {
      console.warn(err);
      dispatch(postRequestNotificationFail(err, notify_user_email));
    });
};

/*****************************************************************************************************/

const relationshipsByEmail = (apiResponse, user_email) => {
  console.log("Relationship by email was called");
  let returnObject = {};
  for (let i = 0; i < apiResponse.length; i++) {
    let other_user =
      apiResponse[i].email1 === user_email
        ? apiResponse[i].email2
        : apiResponse[i].email1;
    returnObject = {
      ...returnObject,
      [other_user]: apiResponse[i]
    };
  }
  return returnObject;
};

const getRelationship = () => ({
  type: GET_RELATIONSHIP
});
const getRelationshipSuccess = response => ({
  type: GET_RELATIONSHIP_SUCCESS,
  response
});
const getRelationshipFail = response => ({
  type: GET_RELATIONSHIP_FAIL,
  response
});

export const requestRelationshipFromApi = () => (dispatch, getState) => {
  console.log("Get relationship api called!");
  dispatch(getRelationship());
  let REQUEST_URL = "https://getassist.app:8080/profiles/getrelationships/" + USER_EMAIL;
  return fetch(REQUEST_URL, {
    method: "GET",
    headers: { Authorization: "Token " + AUTH_TOKEN }
  })
  .then(rawResponse => {
    if (rawResponse.status === 200) {
      return rawResponse.json();
    } else {
      console.log(
        "Get relationship api failed with an error code of: ",
        rawResponse.status
      );
      return -1;
    }
    })
  .then(response => {
    if (response !== -1) {
      let relationByEmail = relationshipsByEmail(response, USER_EMAIL);
      console.log("Response from get_relationship_api: ", relationByEmail);
      dispatch(getRelationshipSuccess(relationByEmail));
    } else {
      dispatch(getRelationshipFail(response));
    }
  })
  .catch(err => {
    dispatch(getRelationshipFail(err));
    console.warn(err);
  });
};
