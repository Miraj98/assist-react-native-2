import { RequestHandler } from '../../../utils/NetworkUtils/RequestCreators'
import { normalizeFeed } from '../../../utils/NetworkUtils/Normalizers'

export const GET_FEED_REQUEST = "GET_FEED_REQUEST"
export const GET_FEED_REQUEST_SUCCESS = "GET_FEED_REQUEST_SUCCESS"
export const GET_FEED_REQUEST_FAIL = "GET_FEED_REQUEST_FAIL"

const getFeed = () => ({
    type: GET_FEED_REQUEST
})
const getFeedSuccess = (meta) => ({
    type: GET_FEED_REQUEST_SUCCESS,
    ...meta
})
const getFeedFail = (meta) => ({
    type: GET_FEED_REQUEST_FAIL,
    ...meta
})
// const paginatedFeedState = (meta={}) => ({
//     type: PAGINATED_FEED,
//     ...meta
// })

export const requestFeedFromApi = () => ((dispatch, getState) => {

    dispatch(getFeed())

    // let requestUrl = FEED_REQUEST_URL + getState().userProfile.email
    // let authToken = getState().auth
    const requestUrl = "https://getassist.app:8080/posts/userfeed/f20170635@pilani.bits-pilani.ac.in"
    const authToken = "3773f421e0de8bae3c97312044ad4791bc0a00e7"

    RequestHandler(requestUrl, authToken, 'GET', dispatch, getFeedSuccess, getFeedFail, normalizeFeed)
})