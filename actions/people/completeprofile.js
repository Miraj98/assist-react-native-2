import {
  GET_COMPLETE_PROFILE,
  GET_COMPLETE_PROFILE_FAIL,
  GET_COMPLETE_PROFILE_SUCCESS,
  AUTH_TOKEN
} from "../actionTypes";

const getCompleteProfile = () => ({
  type: GET_COMPLETE_PROFILE
});
const getCompleteProfileSuccess = (response, email) => ({
  type: GET_COMPLETE_PROFILE_SUCCESS,
  response,
  email
});
const getCompleteProfileFail = response => ({
  type: GET_COMPLETE_PROFILE_FAIL,
  response
});

export const requestCompleteProfileFromApi = email => (async (dispatch, getState) => {
  console.log(`Fetch complete profile for ${email} called.`)
  dispatch(getCompleteProfile());
  const REQUEST_URL = "https://getassist.app:8080/profiles/getcompleteprofile/" + email;
  return fetch(REQUEST_URL, {
    method: "GET",
    headers: { "Authorization": "Token " + AUTH_TOKEN }
  })
  .then(rawResponse => {
    if(rawResponse.status === 200) {
      return rawResponse.json();
    } else {
      console.log("Fetch complete profile api failed with an error code of: ", rawResponse.status);
      return -1
    }
  })
  .then(response => {
    if(response !== -1) {
      console.log("Fethed profile: ", response);
      dispatch(getCompleteProfileSuccess(response, email));
    } else {
      dispatch(getCompleteProfileFail(response));
    }
  })
  .catch(err => {
    console.warn(err);
    dispatch(getCompleteProfileFail(err));
  })
})
