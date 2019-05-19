import { createStore, applyMiddleware, } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import reducers from './reducers'

export default function configureStore(initialState) {
    return createStore(reducers, initialState, applyMiddleware(logger, thunk))
}
