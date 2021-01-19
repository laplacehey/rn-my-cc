import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import HomeStore from './HomeReduce'
const reducers = combineReducers({
    home: HomeStore
})
const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)
const STORE = createStoreWithMiddleware(reducers)
export default STORE
