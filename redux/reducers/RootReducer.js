import { combineReducers } from "redux"
import { postsReducer, isFetchingFeed, commentsById, isFetchingPostById, isPostingNewPost } from './PostsReducer'
import { usersReducer, isFetchingAllUsers, getUsersRequestState } from './UsersReducer'
import linkPreviewReducer from './LinkPreviewReducer'
import { isFetchingInterests, interestsReducer } from "./InterestsReducer"

export default combineReducers({
    posts: postsReducer,
    comments: commentsById,
    allUsers: usersReducer,
    linkPreviews: linkPreviewReducer,
    allInterests: interestsReducer,
    isFetching: combineReducers({
        feed: isFetchingFeed,
        allUsers: isFetchingAllUsers,
        postById: isFetchingPostById,
        interests: isFetchingInterests
    }),
    isPosting: combineReducers({
        post: isPostingNewPost
    })
})