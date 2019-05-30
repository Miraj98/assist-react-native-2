import { RequestHandler } from "../../../utils/NetworkUtils/RequestCreators"
import { CREATE_POST_URL } from '../../../utils/NetworkUtils/NetworkRequests'

export const CREATE_POST = "CREATE_POST"
export const CREATE_POST_SUCCESS = "CREATE_POST_SUCCESS"
export const CREATE_POST_FAIL = "CREATE_POST_FAIL"

const newPost = () => ({
    type: CREATE_POST
})
const newPostSuccess = meta => ({
    type: CREATE_POST_SUCCESS,
    ...meta
})
const newPostFail = meta => ({
    type: CREATE_POST_FAIL,
    ...meta
})

export const newPostRequest = (post_title, post_text, interest, sharedPublic="False") => ((dispatch, getState) => {
    dispatch(newPost())
    const requestUrl = CREATE_POST_URL
    // const authToken = getState().auth
    const authToken = "3773f421e0de8bae3c97312044ad4791bc0a00e7"
    const email = "f20170635@pilani.bits-pilani.ac.in"
    const data = "post_title=" + encodeURIComponent(post_title) + "&post_text=" + encodeURIComponent(post_text) + "&duration=1 day" + "&user_email=" + email + "&friends=True" + "&public=" + sharedPublic + "&interest=" + interest + "&channel=general"
    // return fetch(requestUrl, {
    //     method: 'POST',
    //     headers: {
    //         'Authorization': 'Token ' + authToken,
    //         'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    //     },
    //     body: data
    // })
    // .then(response => {
    //     if(response.status === 201) return response.json()
    //     else return -1
    // })
    // .then(json => {
    //     if(json !== -1) {
    //         console.log(json)
    //         dispatch(newPostSuccess(json))
    //     }
    //     else {
    //         console.log(json)
    //         dispatch(newPostFail(json))
    //     }
    // })
    // .catch(err => {
    //     console.warn(err)
    //     dispatch(newPostFail(err))
    // })
    RequestHandler(requestUrl, authToken, 'POST', dispatch, newPostSuccess, newPostFail, null, data)
})