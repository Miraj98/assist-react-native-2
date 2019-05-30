import { combineReducers } from 'redux'
import { GET_FEED_REQUEST_SUCCESS, GET_FEED_REQUEST, GET_FEED_REQUEST_FAIL } from '../actions/Feed/FeedActions'
import { VOTE, VOTE_REQUEST_FAIL } from '../actions/Posts/VoteActions'
import { GET_POST_BY_ID_SUCCESS, GET_POST_BY_ID, GET_POST_BY_ID_FAIL } from '../actions/Posts/Comments'
import { CREATE_POST, CREATE_POST_SUCCESS, CREATE_POST_FAIL } from '../actions/Posts/CreatePost'

const postsById = (state = {}, action) => {
    switch(action.type) {
        case GET_FEED_REQUEST_SUCCESS:
            let _state = state
            for(let i = 0; i < action.response.posts.allIds.length; i++) {
                _state = {
                    ..._state,
                    [action.response.posts.allIds[i]]: {
                        ..._state[action.response.posts.allIds[i]],
                        ...action.response.posts.byId[action.response.posts.allIds[i]]
                    }
                }
            }
            return {
                ..._state
            }
        case VOTE:
            console.log(action)
            return {
                ...state,
                [action.post_id]: {
                    ...state[action.post_id],
                    likes: action.totalLikes,
                    self_vote: action.vote
                }
            }
        case VOTE_REQUEST_FAIL:
            console.log('API call failed for some reason')
            return {
                ...state,
                [action.post_id]: {
                    ...state[action.post_id],
                    likes: action.prevTotalLikes,
                    self_vote: action.prevVoteState
                }
            }
        case GET_POST_BY_ID_SUCCESS:
            return {
                ...state,
                [action.response.post.id]: action.response.post
            }
        default:
            return state
    }
}

const feedReducer = (state = [], action) => {
    switch(action.type) {
        case GET_FEED_REQUEST_SUCCESS:
            return [...action.response.posts.allIds]
        default:
            return state
    }
}

export const isFetchingFeed = (state = false, action) => {
    switch(action.type) {
        case GET_FEED_REQUEST:
            return true
        case GET_FEED_REQUEST_SUCCESS:
            return false
        case GET_FEED_REQUEST_FAIL:
            return false
        default:
            return state
    }
}

export const commentsById = (state = {}, action) => {
    switch(action.type) {
        case GET_POST_BY_ID_SUCCESS:
            let _state = state
            for(let i = 0; i < action.response.comments.allIds.length; i++) {
                _state = {
                    ..._state,
                    [action.response.comments.allIds[i]]: action.response.comments.byId[action.response.comments.allIds[i]]
                }
            }
            return {
                ..._state
            }
        default:
            return state
    }
}

export const isFetchingPostById = (state = false, action) => {
    switch(action.type) {
        case GET_POST_BY_ID:
            return true
        case GET_POST_BY_ID_SUCCESS:
            return false
        case GET_POST_BY_ID_FAIL:
            return false
        default:
            return state
    }
}

export const isPostingNewPost = (state = false, action) => {
    switch(action.type) {
        case CREATE_POST:
            return true
        case CREATE_POST_SUCCESS:
            console.log('I was definitely called')
            return false
        case CREATE_POST_FAIL:
            console.log('API call failed for some reason :(')
            return false
        default:
            return state
    }
}

export const postsReducer = combineReducers({
    postsById,
    feed: feedReducer
})