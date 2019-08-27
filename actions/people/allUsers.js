import {
  ALL_USERS,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  AUTH_TOKEN
} from "../actionTypes";

const normalizeAllUsers = data => {
  let normalizedData = {
    byEmail: {},
    allEmails: []
  };
  for (let i = 0; i < data.length; i++) {
    normalizedData = {
      byEmail: {
        ...normalizedData.byEmail,
        [data[i].email]: data[i]
      },
      allEmails: [...normalizedData.allEmails, data[i].email]
    };
  }
  return normalizedData;
};

const getAllUsersRequest = () => ({
  type: ALL_USERS
});
const getAllUsersSuccess = response => ({
  type: ALL_USERS_SUCCESS,
  response
});
const getAllUsersFail = response => ({
  type: ALL_USERS_FAIL,
  response
});

export const requestAllUsersFromApi = () => (dispatch, getState) => {
  dispatch(getAllUsersRequest());
  const REQUEST_URL = "https://getassist.app:8080/profiles/getprofileslist/";
  return fetch(REQUEST_URL, {
    method: "GET",
    headers: { Authorization: "Token " + AUTH_TOKEN }
  })
    .then(rawResponse => {
      if (rawResponse.status === 200) return rawResponse.json();
      else {
        // console.log(rawResponse.status)
        dispatch(getAllUsersFail(rawResponse));
        return -1;
      }
    })
    .then(response => {
      if (response !== -1) {
        let allUsers = normalizeAllUsers(response);
        dispatch(getAllUsersSuccess(allUsers));
      }
    })
    .catch(err => {
      console.warn(err);
      dispatch(getAllUsersFail(err));
    });
};
