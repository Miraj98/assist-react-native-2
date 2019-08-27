import {
  GET_CAPTIONS,
  GET_CAPTIONS_FAIL,
  GET_CAPTIONS_SUCCESS,
  AUTH_TOKEN,
  USER_EMAIL
} from "../actionTypes";

const normalizecaptions = captions => {
  let returnObjScheme = {
    allIds: [],
    byId: {}
  };
  for (let i = 0; i < captions.length; i++) {
    returnObjScheme = {
      allIds: [...returnObjScheme.allIds, captions[i].id],
      byId: {
        ...returnObjScheme.byId,
        [captions[i].id]: captions[i]
      }
    };
  }

  return returnObjScheme;
};

const getCaptions = () => ({
  type: GET_CAPTIONS
});
const getCaptionsSuccess = response => ({
  type: GET_CAPTIONS_SUCCESS,
  response
});
const getCaptionsFail = response => ({
  type: GET_CAPTIONS_FAIL,
  response
});

export const requestCaptionsFromApi = () => (dispatch, getState) => {
  console.log("Post captions api called");
  dispatch(getCaptions());
  const REQUEST_URL =
    "https://getassist.app:8080/posts/pagedpostcaptionfeed/" + USER_EMAIL + "/0/100";
  return fetch(REQUEST_URL, {
    method: "GET",
    headers: { Authorization: "Token " + AUTH_TOKEN }
  })
    .then(rawResponse => {
      if (rawResponse.status === 200) return rawResponse.json();
      else {
        console.log("Post captions api call failed with response status: ", rawResponse.status);
        return -1;
      }
    })
    .then(response => {
      if (response !== -1) {
        console.log("Post captions api call successful!");
        response = normalizecaptions(response);
        dispatch(getCaptionsSuccess(response));
      } else dispatch(getCaptionsFail(response));
    })
    .catch(err => {
      console.warn(err);
      dispatch(getCaptionsFail(err));
    });
};
