import { combineReducers } from 'redux'
import { isFetchingCaptions } from '../posts/captions'

export default combineReducers({
    captions: isFetchingCaptions
})