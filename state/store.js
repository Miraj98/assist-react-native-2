import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import RootReducer from './rootReducer'

const persistConfig = {
    key: 'assist',
    storage,
    blacklist: [
        'postRequestsState',
        'isRequestSuccessful',
        'isPosting',
        'isFetching',
        'fontLoaded',
    ]
}
const persistedReducers = persistReducer(persistConfig, RootReducer)

const store = createStore(persistedReducers, applyMiddleware(thunk))

export const persistor = persistStore(store)
export default store