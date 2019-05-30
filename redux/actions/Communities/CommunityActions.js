import { GET_INTERESTS_URL } from '../../../utils/NetworkUtils/NetworkRequests'
import { RequestHandler } from '../../../utils/NetworkUtils/RequestCreators'

export const GET_INTERESTS = "GET_INTERESTS"
export const GET_INTERESTS_SUCCESS = "GET_INTERESTS_SUCCESS"
export const GET_INTERESTS_FAIL = "GET_INTERESTS_FAIL"

const getInterests = () => ({
    type: GET_INTERESTS
})
const getInterestsSuccess = meta => ({
    type: GET_INTERESTS_SUCCESS,
    ...meta
})
const getInterestsFail = meta => ({
    type: GET_INTERESTS_FAIL,
    ...meta
})

export const requestInterestsFromApi = () => ((dispatch, getState) => {
    dispatch(getInterests())
    const requestUrl = GET_INTERESTS_URL + "f20170635@pilani.bits-pilani.ac.in"
     // let authToken = getState().auth
     const authToken = "3773f421e0de8bae3c97312044ad4791bc0a00e7"
     RequestHandler(requestUrl, authToken, 'GET', dispatch, getInterestsSuccess, getInterestsFail)
})