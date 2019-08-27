import { POST_REACTION, POST_REACTION_FAIL, POST_REACTION_SUCCESS, AUTH_TOKEN, USER_EMAIL } from '../actionTypes'

const postReaction = (post_id, vote, totalLikes, captionId) => ({
    type: POST_REACTION,
    post_id,
    vote,
    totalLikes,
    captionId
})
const postReactionSuccess = (response, post_id, vote) => ({
    type: POST_REACTION_SUCCESS,
    response,
    post_id,
    vote
})
const postReactionFail = (response, post_id, vote, prevVoteState, prevTotalLikes, captionId) => ({
    type: POST_REACTION_FAIL,
    response,
    post_id,
    vote,
    prevVoteState,
    prevTotalLikes,
    captionId
})

export const postReactionToApi = (
    vote,
    post_id,
    totalLikes,
    currentVoteState,
    currentTotalLikes,
    captionId
) => ((dispatch, getState) => {

    dispatch(postReaction(post_id, vote, totalLikes, captionId))
    const REQUEST_URL = "https://getassist.app:8080/posts/votepost/"

    return fetch(REQUEST_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': 'Token ' + AUTH_TOKEN
        },
        body: "email=" + USER_EMAIL + "&post_id=" + post_id + "&vote=" + vote
    })
    .then(rawResponse => {
        if(rawResponse.status === 201) return rawResponse.json()
        else {
            console.log("Post vote api returned status: ", rawResponse.status)
            return -1
        }
    })
    .then(response => {
        if(response !== -1) {
            return dispatch(postReactionSuccess(response, post_id, vote))
        } else {
            return dispatch(postReactionFail(response, post_id, vote, currentVoteState, currentTotalLikes, captionId))
        }
    })
    .catch(err => {
        console.warn(err)
        return dispatch(postReactionFail(response, post_id, vote, currentVoteState, currentTotalLikes, captionId))
    })

})