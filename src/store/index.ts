import { createStore } from 'redux'
import reducers from './rdrucers'

const store = createStore(reducers, __REDUX_DEVTOOLS_EXTENSION__?.())

export default store
