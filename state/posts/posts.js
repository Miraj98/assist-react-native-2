import captions from './captions'
import comments from './comments'
import linkpreviews from './linkpreviews'
import { combineReducers } from 'redux'

export default combineReducers({
  captions,
  comments,
  linkpreviews
})