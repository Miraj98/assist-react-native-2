import { combineReducers } from 'redux'
import isFetching from './networkrequests/getrequests'
import captions from './posts/captions'

export default combineReducers({
    captions,
    isFetching
})