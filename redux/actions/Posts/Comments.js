import { POST_REQUEST_URL } from '../../../utils/NetworkUtils/NetworkRequests'
import { RequestHandler } from '../../../utils/NetworkUtils/RequestCreators'
import { normalizePost } from '../../../utils/NetworkUtils/Normalizers'

export const GET_POST_BY_ID = "GET_POST_BY_ID"
export const GET_POST_BY_ID_SUCCESS = "GET_POST_BY_ID_SUCCESS"
export const GET_POST_BY_ID_FAIL = "GET_POST_BY_ID_FAIL"

//GET A PARTICULAR POST BY ITS ID. RETURNS THE ENTIRE POST WITH COMMENTS AND REPLIES
const getPostById = () => ({
    type: GET_POST_BY_ID
})
const getPostByIdSuccess = (meta) => ({
    type: GET_POST_BY_ID_SUCCESS,
    ...meta
})

const getPostByIdFail = (meta) => ({
    type: GET_POST_BY_ID_FAIL,
    ...meta
})

export const requestPostByIdFromApi = post_id => ((dispatch, getState) => {
    dispatch(getPostById())
    const requestUrl = POST_REQUEST_URL + post_id
    // const authToken = getState().auth
    const authToken = "3773f421e0de8bae3c97312044ad4791bc0a00e7"
    RequestHandler(requestUrl, authToken, 'GET', dispatch, getPostByIdSuccess, getPostByIdFail, normalizePost)
})