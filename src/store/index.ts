import { createStore, applyMiddleware, compose } from 'redux'
import reducers from './reducers'
import createSaga from 'redux-saga'
import mySaga from './mySaga'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?.({}) || compose

const saga = createSaga()
const enhancer = composeEnhancer(applyMiddleware(saga))

const store = createStore(reducers, enhancer)

saga.run(mySaga)

export default store
