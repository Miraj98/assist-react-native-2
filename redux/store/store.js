import { createStore, applyMiddleware } from 'redux'
import RootReducer from '../reducers/RootReducer'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'assist',
    storage,
    blacklist: [
        'postRequestsState',
        'isRequestSuccessful',
        'isPosting',
        'isFetching',
        'notifications',
        'fontLoaded'
    ]
}

const persistedReducers = persistReducer(persistConfig, RootReducer)
const store = createStore(persistedReducers, applyMiddleware(thunk))

export const persistor = persistStore(store)
export default store