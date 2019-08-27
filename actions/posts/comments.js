import {
  GET_COMMENTS,
  GET_COMMENTS_FAIL,
  GET_COMMENTS_SUCCESS,
  AUTH_TOKEN,
  USER_EMAIL,
  POST_NEW_COMMENT,
  POST_NEW_COMMENT_SUCCESS,
  POST_NEW_COMMENT_FAIL
} from "../actionTypes";

const normalizePost = post => {
  let normalizedPost = {
    mapPostToComments: {},
    comments: {
      byId: {},
      allIds: []
    }
  };
  for (let i = 0; i < post.comments.length; i++) {
    normalizedPost = {
      ...normalizedPost,
      comments: {
        byId: {
          ...normalizedPost.comments.byId,
          [post.comments[i].id]: post.comments[i]
        },
        allIds: [...normalizedPost.comments.allIds, post.comments[i].id]
      }
    };
  }
  normalizedPost = {
    ...normalizedPost,
    mapPostToComments: { [post.id]: normalizedPost.comments.allIds }
  };
  return normalizedPost;
};

const getComments = post_id => ({
  type: GET_COMMENTS,
  post_id
});
const getCommentsSuccess = response => ({
  type: GET_COMMENTS_SUCCESS,
  response
});
const getCommentsFail = response => ({
  type: GET_COMMENTS_FAIL,
  response
});

export const requestCommentsFromApi = post_id => (dispatch, getState) => {
  dispatch(getComments(post_id));
  const REQUEST_URL = "https://getassist.app:8080/posts/getpost/" + post_id;
  return fetch(REQUEST_URL, {
    method: "GET",
    headers: { Authorization: "Token " + AUTH_TOKEN }
  })
    .then(rawResponse => {
      if (rawResponse.status === 200) {
        return rawResponse.json();
      } else {
        console.log("Get comments api returned status: ", rawResponse.status);
        return -1;
      }
    })
    .then(response => {
      if (response !== -1) {
        console.log("Complete post: ", response);
        response = normalizePost(response);
        return dispatch(getCommentsSuccess(response));
      } else {
        return dispatch(getCommentsFail(response));
      }
    })
    .catch(err => {
      console.warn(err);
      return dispatch(getCommentsFail(err));
    });
};

const postNewComment = () => ({
  type: POST_NEW_COMMENT
});
const postNewCommentSuccess = (response, post_id) => ({
  type: POST_NEW_COMMENT_SUCCESS,
  response,
  post_id,
});
const postNewCommentFail = response => ({
  type: POST_NEW_COMMENT_FAIL,
  response
});

export const postNewCommentToApi = (
  post_id,
  comment,
  parent_comment_id = null,
  entities = []
) => (dispatch, getState) => {
  console.log("Posting new comment to postId: ", post_id);
  dispatch(postNewComment());
  const REQUEST_URL = "https://getassist.app:8080/posts/newcommentjson/";
  const data = {
    email: USER_EMAIL,
    post_id,
    comment,
    parent_comment_id,
    entities
  };

  return fetch(REQUEST_URL, {
    method: "POST",
    headers: {
      Authorization: "Token " + AUTH_TOKEN,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(async rawResponse => {
      if (rawResponse.status === 201) {
        console.log(rawResponse);
        const jsonResponse = await rawResponse.json();
        return jsonResponse
      } else {
        return -1;
      }
    })
    .then(response => {
      console.log("Post comment json response: ", response);
      if (response !== -1) {
        console.log("Post new comment successfull! Response: ", response);
        dispatch(postNewCommentSuccess(response, post_id));
      } else {
        dispatch(postNewCommentFail(response));
      }
    })
    .catch(err => {
      console.warn(err);
      dispatch(postNewCommentFail(err));
    });
};
