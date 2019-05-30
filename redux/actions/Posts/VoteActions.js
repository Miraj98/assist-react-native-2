import { VOTE_POST_URL } from '../../../utils/NetworkUtils/NetworkRequests'
import { RequestHandler } from '../../../utils/NetworkUtils/RequestCreators'

export const VOTE = "VOTE_REQUEST"
export const VOTE_REQUEST_SUCCESS = "VOTE_REQUEST_SUCCESS"
export const VOTE_REQUEST_FAIL = "VOTE_REQUEST_FAIL"

const _vote = (post_id, vote, totalLikes) => ({
    type: VOTE,
    post_id,
    vote,
    totalLikes
})
const voteRequestSuccess = (meta) => ({
    type: VOTE_REQUEST_SUCCESS,
    ...meta
})
const voteRequestFail = (meta) => ({
    type: VOTE_REQUEST_FAIL,
    ...meta
})

export const voteRequest = (vote, post_id, totalLikes, currentVoteState, currentTotalLikes) => ((dispatch, getState) => {
    dispatch(_vote(post_id, vote, totalLikes))
    const requestUrl = VOTE_POST_URL
    // const authToken = getState().auth
    const authToken =  "3773f421e0de8bae3c97312044ad4791bc0a00e7"
    // const email = getState().userProfile.email
    const email = "f20170635@pilani.bits-pilani.ac.in"
    const data = "email=" + email + "&post_id=" + post_id + "&vote=" + vote
    const meta = {
        post_id,
        vote,
        prevVoteState: currentVoteState,
        prevTotalLikes: currentTotalLikes
    }
    RequestHandler(requestUrl, authToken, 'POST', dispatch, voteRequestSuccess, voteRequestFail, null, data, meta)
})