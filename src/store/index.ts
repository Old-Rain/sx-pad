import { createStore } from 'redux'
import reducers from './reducers'

window.__REDUX_DEVTOOLS_EXTENSION__ = window.__REDUX_DEVTOOLS_EXTENSION__ || function () {}
let store = createStore(reducers, __REDUX_DEVTOOLS_EXTENSION__())

export default store
