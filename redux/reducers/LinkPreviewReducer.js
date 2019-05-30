import { GET_LINK_PREVIEW } from '../actions/Posts/LinkPreviews'

export default linkPreviewReducer = (state = {}, action) => {
    switch(action.type) {
        case GET_LINK_PREVIEW:
            return {
                ...state,
                [action.post_id]: action.response
            }
        default:
            return state
    }
}