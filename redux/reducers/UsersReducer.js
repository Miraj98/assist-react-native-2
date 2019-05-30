import { combineReducers } from 'redux'
import { GET_ALL_USERS, GET_ALL_USERS_FAIL, GET_ALL_USERS_SUCCESS } from '../actions/Users/UsersActions'

const usersByEmail = (state = {}, action) => {
    switch(action.type) {
        case GET_ALL_USERS_SUCCESS:
            return { ...action.response.byEmail }
        // case GET_PROFILE_SUCCESS:
        //     return { ...state, [action.email]: { ...state[action.email], ...action.response } }
        default:
            return state
    }
}

const allUserEmails = (state = [], action) => {
    switch(action.type) {
        case GET_ALL_USERS_SUCCESS:
            return [...action.response.allEmails]
        default:
            return state
    }
}

export const isFetchingAllUsers = (state = false, action) => {
    switch(action.type) {
        case GET_ALL_USERS:
            return true
        case GET_ALL_USERS_SUCCESS:
            return false
        case GET_ALL_USERS_FAIL:
            return false
        default:
            return state
    }
}

export const getUsersRequestState = (state = {}, action) => {
    switch(action.type) {
        case GET_ALL_USERS_SUCCESS:
            return {...action.response }
        case GET_ALL_USERS_FAIL:
            return { ...action.response }
        default:
            return state
    }
}

export const usersReducer = combineReducers({
    byEmail: usersByEmail,
    allEmails: allUserEmails
})