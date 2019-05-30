import { GET_INTERESTS, GET_INTERESTS_FAIL, GET_INTERESTS_SUCCESS } from '../actions/Communities/CommunityActions'

export const interestsReducer = (state = [], action) => {
    switch(action.type) {
        case GET_INTERESTS_SUCCESS:
            return action.response
        default:
            return state
    }
}

export const isFetchingInterests = (state = false, action) => {
    switch(action.type) {
        case GET_INTERESTS:
            return true
        case GET_INTERESTS_SUCCESS:
            return false 
        case GET_INTERESTS_FAIL:
            return false
        default:
            return state
    }
}