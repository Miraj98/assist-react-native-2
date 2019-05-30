import { PROFILES_LIST_REQUEST_URL } from '../../../utils/NetworkUtils/NetworkRequests'
import { normalizeAllUsers } from '../../../utils/NetworkUtils/Normalizers'
import { RequestHandler } from '../../../utils/NetworkUtils/RequestCreators'

export const GET_ALL_USERS = "GET_ALL_USERS"
export const GET_ALL_USERS_SUCCESS = "GET_ALL_USERS_SUCCESS"
export const GET_ALL_USERS_FAIL = "GET_ALL_USERS_FAIL"

const getAllUsersRequest = (meta) => ({
    type: GET_ALL_USERS,
    ...meta
})
const getAllUsersSuccess = (meta) => ({
    type: GET_ALL_USERS_SUCCESS,
    ...meta
})
const getAllUsersFail = (meta) => ({
    type: GET_ALL_USERS_FAIL,
    ...meta
})

export const requestAllUsersFromApi = () => ((dispatch, getState) => {
    dispatch(getAllUsersRequest())
    const requestUrl = PROFILES_LIST_REQUEST_URL
    // let authToken = getState().auth
    const authToken = "3773f421e0de8bae3c97312044ad4791bc0a00e7"

    RequestHandler(requestUrl, authToken, 'GET', dispatch, getAllUsersSuccess, getAllUsersFail, normalizeAllUsers)

})