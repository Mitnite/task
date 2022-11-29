import {combineReducers} from "redux";
import {list} from './list'

const rootReducer = combineReducers({
  liked: false,
  posts: list
})
export default rootReducer;
