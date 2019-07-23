import { GET_CAPTIONS, GET_CAPTIONS_FAIL, GET_CAPTIONS_SUCCESS } from '../../actions/actionTypes'
import { combineReducers } from 'redux'

const captionIds = (state = [], action) => {
    switch(action.type) {
        case GET_CAPTIONS_SUCCESS:
            return [...action.response.allIds]
        default:
            return state
    }
}

const captionsById = (state = {}, action) => {
    switch(action.type) {
        case GET_CAPTIONS_SUCCESS:
            return { ...state, ...action.response.byId }
        default:
            return state
    }
}

export const isFetchingCaptions = (state = false, action) => {
    switch(action.type) {
        case GET_CAPTIONS:
            return true
        case GET_CAPTIONS_FAIL:
            return false
        case GET_CAPTIONS_SUCCESS:
            return false
        default:
            return state
    }
}

export default combineReducers({
    allIds: captionIds,
    byId: captionsById
})